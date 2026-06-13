import os
from flask import current_app
from pypdf import PdfReader
from werkzeug.utils import secure_filename
from database.connection import db
from models.resume import Resume
from models.profile import Profile
from models.skill import Skill
from services.profile_service import ProfileService
from services.gemini_service import GeminiService
from utils.validators import allowed_file

class ResumeService:
    @staticmethod
    def upload_resume(user_id, file):
        """Validates, uploads a PDF resume, parses its text, and analyzes it using the Gemini API."""
        if not file or file.filename == '':
            return {"error": "No file selected", "status": 400}

        if not allowed_file(file.filename, {'pdf'}):
            return {"error": "Invalid file format. Only PDF files are allowed", "status": 400}

        try:
            # 1. Setup upload directory
            upload_dir = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir, exist_ok=True)

            # Generate secure filename
            safe_filename = secure_filename(file.filename)
            filename = f"user_{user_id}_{safe_filename}"
            filepath = os.path.join(upload_dir, filename)

            # Save file locally
            file.save(filepath)
            relative_path = filepath.replace('\\', '/')

            # 2. Extract text from the PDF file using pypdf
            resume_text = ""
            try:
                reader = PdfReader(filepath)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        resume_text += text + "\n"
            except Exception as parse_err:
                # Return standard fallback string if parsing hits corrupted files
                resume_text = f"Corrupted or non-readable PDF structure. File: {safe_filename}"

            # 3. Retrieve target role from user profile
            profile = Profile.query.filter_by(user_id=user_id).first()
            target_role = profile.target_role if profile and profile.target_role else "Software Engineer"

            # 4. Invoke Gemini API service to analyze resume text
            analysis = GeminiService.analyze_resume(resume_text, target_role)

            # 5. Insert entries in resumes table
            new_resume = Resume(
                user_id=user_id,
                file_name=safe_filename,
                file_path=relative_path,
                parsed_content=resume_text
            )
            db.session.add(new_resume)
            db.session.commit()

            # 6. Auto-seed extracted skills into user's skills inventory
            detected_skills = analysis.get('detected_skills', [])
            for skill_name in detected_skills[:8]: # Cap at top 8 to prevent db clutter
                # Check for duplicate skills
                existing = Skill.query.filter_by(user_id=user_id, skill_name=skill_name).first()
                if not existing:
                    new_skill = Skill(
                        user_id=user_id,
                        skill_name=skill_name,
                        proficiency='Intermediate' # Default middle ground for extracted skills
                    )
                    db.session.add(new_skill)
            db.session.commit()

            # 7. Update profile readiness score directly based on Gemini ATS evaluation
            if profile:
                profile.readiness_score = analysis.get('ats_score', profile.readiness_score)
                db.session.commit()
            else:
                # Fallback recalculate
                ProfileService.recalculate_readiness_score(user_id)

            return {
                "message": "Resume uploaded and analyzed successfully by Gemini AI.",
                "resume_path": relative_path,
                "analysis": analysis,
                "status": 200
            }
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to upload resume: {str(e)}", "status": 500}
