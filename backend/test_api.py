import os
import unittest
import json
import io
from datetime import datetime
from app import create_app
from database.connection import db
from models.user import User
from models.profile import Profile
from models.skill import Skill
from models.roadmap import Roadmap, RoadmapItem
from models.resume import Resume
from models.interview_question import InterviewQuestion, question_companies
from models.target_company import TargetCompany
from models.progress_tracking import ProgressTracking

from config import Config

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    JWT_SECRET_KEY = 'test-secret'

class TestPlacifyAPI(unittest.TestCase):
    def setUp(self):
        """Sets up a test client and in-memory database prior to running each test case."""
        self.app = create_app(TestingConfig)
        self.app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'test_uploads')
        
        self.client = self.app.test_client()
        
        # Initialize the database structures
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        """Cleans up the database and files created during tests."""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            
        # Clean up test uploads directory if it exists
        upload_dir = self.app.config['UPLOAD_FOLDER']
        if os.path.exists(upload_dir):
            for filename in os.listdir(upload_dir):
                os.remove(os.path.join(upload_dir, filename))
            os.rmdir(upload_dir)

    def _get_auth_headers(self, email="test@example.com", password="Password123"):
        """Helper to register and login a user, returning auth headers with a valid JWT token."""
        # 1. Register
        self.client.post('/api/auth/register', 
                         data=json.dumps({"email": email, "password": password}),
                         content_type='application/json')
        # 2. Login
        login_res = self.client.post('/api/auth/login', 
                                    data=json.dumps({"email": email, "password": password}),
                                    content_type='application/json')
        data = json.loads(login_res.data)
        token = data['data']['access_token']
        return {'Authorization': f'Bearer {token}'}

    def test_health_check(self):
        """Tests health check root endpoint."""
        res = self.client.get('/')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertIn("online", data['message'])

    def test_auth_registration(self):
        """Tests user registration flow and credentials verification."""
        # Test successful registration
        res = self.client.post('/api/auth/register', 
                               data=json.dumps({"email": "user@example.com", "password": "Password123"}),
                               content_type='application/json')
        self.assertEqual(res.status_code, 201)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['data']['user']['email'], "user@example.com")

    def test_auth_login(self):
        """Tests user login and JWT generation."""
        # Register user first
        self.client.post('/api/auth/register', 
                         data=json.dumps({"email": "login@example.com", "password": "Password123"}),
                         content_type='application/json')

        # Test valid login
        res = self.client.post('/api/auth/login', 
                               data=json.dumps({"email": "login@example.com", "password": "Password123"}),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertIn('access_token', data['data'])

    def test_profile_retrieval_and_update(self):
        """Tests profile read and write operations."""
        headers = self._get_auth_headers()

        # Get Profile
        res = self.client.get('/api/profile', headers=headers)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertEqual(data['data']['full_name'], None)

        # Update Profile
        update_data = {
            "full_name": "Sowmya Sharma",
            "bio": "Software Engineering Student",
            "target_role": "Backend Developer",
            "experience_level": "Entry"
        }
        res_update = self.client.put('/api/profile', 
                                     data=json.dumps(update_data), 
                                     headers=headers,
                                     content_type='application/json')
        self.assertEqual(res_update.status_code, 200)
        data_update = json.loads(res_update.data)
        self.assertEqual(data_update['data']['full_name'], "Sowmya Sharma")
        
        # Readiness score should go up since profile fields are populated
        self.assertGreater(data_update['data']['readiness_score'], 0)

    def test_resume_upload_and_relationship(self):
        """Tests uploading a resume, validating entries in the resumes table, and dynamic profile retrieval."""
        headers = self._get_auth_headers()

        # 1. Upload first resume
        resume_data_1 = {
            'resume': (io.BytesIO(b"%PDF-1.4 dummy pdf 1"), 'resume_v1.pdf')
        }
        res_1 = self.client.post('/api/resume/upload', 
                                 data=resume_data_1, 
                                 headers=headers,
                                 content_type='multipart/form-data')
        self.assertEqual(res_1.status_code, 200)

        # 2. Upload second resume (v2)
        resume_data_2 = {
            'resume': (io.BytesIO(b"%PDF-1.4 dummy pdf 2"), 'resume_v2.pdf')
        }
        res_2 = self.client.post('/api/resume/upload', 
                                 data=resume_data_2, 
                                 headers=headers,
                                 content_type='multipart/form-data')
        self.assertEqual(res_2.status_code, 200)

        # 3. Verify user's resumes and profile returns the latest uploaded file path
        with self.app.app_context():
            user = User.query.filter_by(email="test@example.com").first()
            self.assertEqual(len(user.resumes), 2)
            
            # Fetch profile dict and ensure it reflects latest resume path
            profile_dict = user.profile.to_dict()
            self.assertIn("resume_v2.pdf", profile_dict['resume_path'])

    def test_skills_crud(self):
        """Tests skills CRUD actions (Create, Read, Update, Delete)."""
        headers = self._get_auth_headers()

        # 1. Add Skill
        res_add = self.client.post('/api/skills',
                                   data=json.dumps({"skill_name": "Python", "proficiency": "Intermediate"}),
                                   headers=headers,
                                   content_type='application/json')
        self.assertEqual(res_add.status_code, 201)
        skill_id = json.loads(res_add.data)['data']['id']

        # 2. Get Skills
        res_get = self.client.get('/api/skills', headers=headers)
        self.assertEqual(res_get.status_code, 200)
        skills_list = json.loads(res_get.data)['data']
        self.assertEqual(len(skills_list), 1)

        # 3. Delete Skill
        res_del = self.client.delete(f'/api/skills/{skill_id}', headers=headers)
        self.assertEqual(res_del.status_code, 200)

    def test_target_company_model(self):
        """Tests TargetCompany model operations, mapping, and cascades."""
        with self.app.app_context():
            user = User(email="company-test@example.com", password_hash="hash")
            db.session.add(user)
            db.session.commit()

            company = TargetCompany(
                user_id=user.id,
                company_name="Google",
                application_status="dream",
                job_title="Software Engineer"
            )
            db.session.add(company)
            db.session.commit()

            self.assertEqual(len(user.target_companies), 1)
            self.assertEqual(user.target_companies[0].company_name, "Google")

            # Test cascade deletion of user cascades to target company
            db.session.delete(user)
            db.session.commit()
            
            remaining_companies = TargetCompany.query.filter_by(company_name="Google").all()
            self.assertEqual(len(remaining_companies), 0)

    def test_interview_question_mapping(self):
        """Tests InterviewQuestion model, difficulty filters, and company mapping constraints."""
        with self.app.app_context():
            q = InterviewQuestion(
                question_text="What is SQL indexing?",
                answer_key="It creates data structures to speed up database reads.",
                difficulty="Medium",
                category="Technical",
                role_tag="Backend Developer"
            )
            db.session.add(q)
            db.session.commit()

            # Map to companies using standard mapping query execution
            db.session.execute(
                question_companies.insert().values(question_id=q.id, company_name="Google")
            )
            db.session.execute(
                question_companies.insert().values(question_id=q.id, company_name="Amazon")
            )
            db.session.commit()

            # Fetch and verify dict has tags
            q_dict = q.to_dict()
            self.assertIn("Google", q_dict['companies'])
            self.assertIn("Amazon", q_dict['companies'])

    def test_progress_tracking_model(self):
        """Tests ProgressTracking model fields and unique constraints."""
        with self.app.app_context():
            user = User(email="progress@example.com", password_hash="hash")
            db.session.add(user)
            db.session.commit()

            pt = ProgressTracking(
                user_id=user.id,
                item_type="roadmap_item",
                item_id=15,
                status="completed"
            )
            db.session.add(pt)
            db.session.commit()

            # Attempting duplicate item insertion should raise IntegrityError
            dup_pt = ProgressTracking(
                user_id=user.id,
                item_type="roadmap_item",
                item_id=15,
                status="in_progress"
            )
            db.session.add(dup_pt)
            
            with self.assertRaises(Exception):
                db.session.commit()
            db.session.rollback()

    def test_get_interview_questions_endpoint(self):
        """Tests generating AI interview questions via GET /api/interview/questions."""
        headers = self._get_auth_headers()

        # Update profile to set target role so it has something to generate against
        self.client.put('/api/profile', 
                        data=json.dumps({"target_role": "Backend Developer"}), 
                        headers=headers,
                        content_type='application/json')

        # Test request with category Technical
        res = self.client.get('/api/interview/questions?category=Technical', headers=headers)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertGreater(len(data['data']), 0)
        self.assertEqual(data['data'][0]['category'], 'Technical')
        self.assertEqual(data['data'][0]['role_tag'], 'Backend Developer')

if __name__ == '__main__':
    unittest.main()
