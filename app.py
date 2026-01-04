from flask import Flask, render_template, send_file
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

def get_portfolio_data():
    """Load all portfolio data from environment variables"""

    # Personal Information
    personal = {
        'name': os.getenv('PORTFOLIO_NAME', 'Your Name'),
        'title': os.getenv('PORTFOLIO_TITLE', 'Your Title'),
        'email': os.getenv('PORTFOLIO_EMAIL', 'your.email@example.com'),
        'phone': os.getenv('PORTFOLIO_PHONE', ''),
    }

    # About Me
    about = {
        'intro': os.getenv('ABOUT_INTRO', ''),
        'paragraph_1': os.getenv('ABOUT_PARAGRAPH_1', ''),
        'paragraph_2': os.getenv('ABOUT_PARAGRAPH_2', ''),
    }

    # Social Media
    social = {
        'linkedin': os.getenv('SOCIAL_LINKEDIN', '#'),
        'github': os.getenv('SOCIAL_GITHUB', '#'),
        'twitter': os.getenv('SOCIAL_TWITTER', '#'),
        'website': os.getenv('SOCIAL_WEBSITE', '#'),
    }

    # Skills
    skills = []
    for i in range(1, 7):
        skill = {
            'icon': os.getenv(f'SKILL_{i}_ICON', ''),
            'name': os.getenv(f'SKILL_{i}_NAME', ''),
            'description': os.getenv(f'SKILL_{i}_DESCRIPTION', ''),
        }
        if skill['name']:
            skills.append(skill)

    # Projects
    projects = []
    for i in range(1, 6):
        project_name = os.getenv(f'PROJECT_{i}_NAME')
        if project_name:
            tech_string = os.getenv(f'PROJECT_{i}_TECH', '')
            tech_list = [tech.strip() for tech in tech_string.split(',') if tech.strip()]

            project = {
                'name': project_name,
                'type': os.getenv(f'PROJECT_{i}_TYPE', 'Project'),
                'description': os.getenv(f'PROJECT_{i}_DESCRIPTION', ''),
                'tech': tech_list,
                'live_url': os.getenv(f'PROJECT_{i}_LIVE_URL', ''),
                'github_url': os.getenv(f'PROJECT_{i}_GITHUB_URL', ''),
                'has_preview': os.getenv(f'PROJECT_{i}_HAS_PREVIEW', 'false').lower() == 'true',
            }
            projects.append(project)

    # Achievements
    achievements = []
    for i in range(1, 7):
        achievement_title = os.getenv(f'ACHIEVEMENT_{i}_TITLE')
        if achievement_title:
            achievement = {
                'icon': os.getenv(f'ACHIEVEMENT_{i}_ICON', '🏆'),
                'title': achievement_title,
                'date': os.getenv(f'ACHIEVEMENT_{i}_DATE', ''),
                'description': os.getenv(f'ACHIEVEMENT_{i}_DESCRIPTION', ''),
                'image_url': os.getenv(f'ACHIEVEMENT_{i}_IMAGE_URL', ''),
            }
            achievements.append(achievement)

    # Interests
    interests = []
    for i in range(1, 7):
        interest_text = os.getenv(f'INTEREST_{i}_TEXT')
        if interest_text:
            interest = {
                'emoji': os.getenv(f'INTEREST_{i}_EMOJI', ''),
                'text': interest_text,
            }
            interests.append(interest)

    # Resume
    resume = {
        'description': os.getenv('RESUME_DESCRIPTION', 'Download my resume'),
    }

    # Contact
    contact = {
        'intro': os.getenv('CONTACT_INTRO', ''),
    }

    return {
        'personal': personal,
        'about': about,
        'social': social,
        'skills': skills,
        'projects': projects,
        'achievements': achievements,
        'interests': interests,
        'resume': resume,
        'contact': contact,
    }

@app.route('/')
def home():
    data = get_portfolio_data()
    return render_template('index.html', data=data)

@app.route('/download-resume')
def download_resume():
    resume_path = os.path.join(app.root_path, 'static', 'resume', 'resume.pdf')
    name = os.getenv('PORTFOLIO_NAME', 'Resume').replace(' ', '_')
    return send_file(resume_path, as_attachment=True, download_name=f'{name}_Resume.pdf')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
