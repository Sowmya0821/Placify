import json
import logging
import google.generativeai as genai
from flask import current_app
from config import Config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiService:
    _initialized = False

    @classmethod
    def _init_gemini(cls):
        """Initializes the Google Gen AI client with the configured API key."""
        if cls._initialized:
            return True

        api_key = current_app.config.get('GEMINI_API_KEY') or Config.GEMINI_API_KEY
        if not api_key or api_key == 'your_gemini_api_key_here':
            logger.warning("GEMINI_API_KEY is not set or contains placeholder. Backend will use mock fallback generators.")
            return False

        try:
            genai.configure(api_key=api_key)
            cls._initialized = True
            logger.info("Google Generative AI library successfully initialized.")
            return True
        except Exception as e:
            logger.error(f"Failed to configure Google Gen AI SDK: {str(e)}")
            return False

    @classmethod
    def _generate_json(cls, prompt, system_instruction=None):
        """Helper to invoke Gemini flash-1.5 model and request a structured JSON output."""
        if not cls._init_gemini():
            return None

        try:
            # We use gemini-1.5-flash as the fast, efficient utility model
            model = genai.GenerativeModel(
                model_name='gemini-1.5-flash',
                generation_config={"response_mime_type": "application/json"},
                system_instruction=system_instruction
            )
            
            response = model.generate_content(prompt)
            if not response.text:
                logger.error("Empty response received from Gemini API.")
                return None
                
            return json.loads(response.text)
        except Exception as e:
            logger.error(f"Gemini API execution error: {str(e)}")
            return None

    @staticmethod
    def analyze_resume(resume_text, target_role):
        """Analyzes resume text against a target role, returning ATS scores, skills, and suggestions."""
        system_instruction = (
            "You are an expert ATS (Applicant Tracking System) compiler and recruitment auditor. "
            "You analyze resume texts for structural compatibility, keyword strength, and alignment to target roles."
        )

        prompt = f"""
        Analyze the following resume text against the target role '{target_role}'.
        
        Resume text:
        ---
        {resume_text}
        ---

        Return a JSON response conforming strictly to this schema:
        {{
            "ats_score": 0 to 100 integer,
            "detected_skills": ["skill_name", "skill_name", ...],
            "missing_skills": ["missing_skill_name", "missing_skill_name", ...],
            "suggestions": [
                {{
                    "title": "Short title of suggestion",
                    "desc": "Detailed actionable improvement description"
                }}
            ]
        }}
        """

        result = GeminiService._generate_json(prompt, system_instruction)
        if result:
            return result

        # Fallback Mock Data if API fails or API key is not present
        logger.info("Executing mock fallback for resume analysis.")
        return {
            "ats_score": 75,
            "detected_skills": ["Python", "SQL", "Flask", "HTML", "CSS"],
            "missing_skills": ["Docker", "Kubernetes", "CI/CD Pipeline", "System Design"],
            "suggestions": [
                {
                    "title": "Quantify experience project impact",
                    "desc": "Modify bullet points to show measurable metrics (e.g. 'Reduced latency by 20%')."
                },
                {
                    "title": "Add modern devops tools",
                    "desc": "Your target role requires containers. Include references to Docker or Kubernetes."
                }
            ]
        }

    @staticmethod
    def generate_roadmap(target_role, experience_level):
        """Generates a personalized, week-by-week learning syllabus for a target role."""
        system_instruction = (
            "You are a professional technical mentor and curriculum developer. "
            "You design logical, sequential learning roadmaps structured specifically to onboard software candidates."
        )

        prompt = f"""
        Generate a structured week-by-week learning roadmap for a candidate aiming to become a '{target_role}' at the '{experience_level}' experience level.
        The roadmap must contain exactly 4 logical phases/weeks.

        Return a JSON response conforming strictly to this schema:
        {{
            "title": "Descriptive title of the roadmap",
            "description": "Short explanation of the learning path targets",
            "items": [
                {{
                    "title": "Milestone phase title (e.g., HTML/CSS Basics)",
                    "description": "Summary description of what the user will learn in this phase",
                    "order_index": 1 to 4 index integer
                }}
            ]
        }}
        """

        result = GeminiService._generate_json(prompt, system_instruction)
        if result:
            return result

        # Fallback Mock Data if API fails or key is missing
        logger.info("Executing mock fallback for roadmap generation.")
        return {
            "title": f"Custom {target_role} Learning Path",
            "description": f"Personalized 4-week preparation track to become a {target_role}.",
            "items": [
                {"title": "Core Foundations & Concepts", "description": "Master basic parameters and initial frameworks syntax.", "order_index": 1},
                {"title": "Intermediate Modules & Structures", "description": "Design components database mappings and route queries.", "order_index": 2},
                {"title": "System Design & Scaling", "description": "Cover caching systems, containers setups and deploy files.", "order_index": 3},
                {"title": "Mock Interviews & Job Preparation", "description": "Practice coding algorithms, format resume and review behavioral STAR answers.", "order_index": 4}
            ]
        }

    @staticmethod
    def generate_interview_questions(target_role, category="Technical"):
        """Generates mock interview questions with sample answers tailored for a target role."""
        system_instruction = (
            "You are a principal engineer and HR screening specialist at a major tech firm. "
            "You write targeted technical and behavioral interview questions designed to test core engineering capabilities."
        )

        prompt = f"""
        Generate exactly 5 interview questions with answers for a candidate applying for the role '{target_role}'.
        The questions must belong to the category '{category}' (e.g., Technical, Behavioral, System Design).

        Return a JSON response conforming strictly to this schema:
        {{
            "questions": [
                {{
                    "question_text": "The text of the interview question",
                    "answer_key": "Model response summary or criteria to look for",
                    "difficulty": "Easy, Medium, or Hard",
                    "category": "{category}",
                    "role_tag": "{target_role}"
                }}
            ]
        }}
        """

        result = GeminiService._generate_json(prompt, system_instruction)
        if result:
            return result

        # Fallback Mock Data if API fails or key is missing
        logger.info("Executing mock fallback for interview questions.")
        return {
            "questions": [
                {
                    "question_text": f"What is a primary scaling pattern you would use in a {target_role} architecture?",
                    "answer_key": "Look for answers mentioning load balancing, microservices separations, or caching layers.",
                    "difficulty": "Medium",
                    "category": category,
                    "role_tag": target_role
                },
                {
                    "question_text": f"Describe a complex technical challenge you faced and how you overcame it.",
                    "answer_key": "Verify STAR method responses, technical debugging steps, and communication qualities.",
                    "difficulty": "Medium",
                    "category": category,
                    "role_tag": target_role
                }
            ]
        }

    @staticmethod
    def evaluate_readiness(profile_data, skills_list, resume_text=""):
        """Evaluates overall placement readiness dynamically using user profile details."""
        system_instruction = (
            "You are a professional placement coordinator and hiring strategist. "
            "You evaluate candidates profiles and technical stacks to determine their likelihood of landing target job roles."
        )

        prompt = f"""
        Analyze the following candidate's details and provide a readiness evaluation:
        
        Profile Info:
        - Target Role: {profile_data.get('target_role')}
        - Experience Level: {profile_data.get('experience_level')}
        - Bio: {profile_data.get('bio')}
        - College/GPA: {profile_data.get('college_name')} (GPA: {profile_data.get('cgpa')})
        
        Skills Registered:
        - {", ".join(skills_list) if skills_list else 'No skills listed'}
        
        Resume Text Snippet:
        ---
        {resume_text[:1000] if resume_text else 'No resume uploaded'}
        ---

        Return a JSON response conforming strictly to this schema:
        {{
            "readiness_score": 0 to 100 readiness percentage integer,
            "feedback": "Overall placement readiness review summary",
            "tips": ["Tip 1 text", "Tip 2 text", ...]
        }}
        """

        result = GeminiService._generate_json(prompt, system_instruction)
        if result:
            return result

        # Fallback Mock Data if API fails or key is missing
        logger.info("Executing mock fallback for readiness evaluation.")
        return {
            "readiness_score": 60,
            "feedback": "Moderate readiness. Your target profile has good basics but lacks required backend framework certifications or project highlights.",
            "tips": [
                "Add 2 core technical skills to sync with standard job descriptions.",
                "Upload a PDF resume to parse qualifications.",
                "Complete at least 3 milestones in your placement roadmap."
            ]
        }
