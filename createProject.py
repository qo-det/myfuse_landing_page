import os

# Define the base directory for the project
BASE_DIR = "./"

# Directory structure
directories = [
    "src",
    "src/assets/styles",
    "src/assets/variables",
    "src/routes",
    "src/pages/Welcome",
    "src/pages/LandingPage",
    "src/components/landingPage/FaqSection",
    "src/components/landingPage/SliderAnimation",
    "src/components/landingPage/animationSection",
    "src/components/landingPage/carouselAlgo",
    "src/components/landingPage/companiesWorking",
    "src/components/landingPage/customerJourney",
    "src/components/landingPage/desktopFooterSection",
    "src/components/landingPage/featureSection",
    "src/components/landingPage/footer",
    "src/components/landingPage/footerSection",
    "src/components/landingPage/getJobs",
    "src/components/landingPage/getStartedSection",
    "src/components/landingPage/heroSection",
    "src/components/landingPage/mobileFooterSection",
    "src/components/landingPage/navbar",
    "src/components/landingPage/responsiveAnimationSection",
    "src/components/landingPage/resumeCarousel",
    "src/components/landingPage/tempelatePage",
    "src/components/landingPage/testimonialSection",
    "src/components/landingPage/verticalAnimationSection",
    "src/constants",
    "src/utils",
]

# Files to create (key files with sample content)
files_with_content = {
    "src/index.js": """import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
""",
    "src/App.js": """import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
""",
    "src/assets/styles/global.module.css": "/* Global styles */",
    "src/assets/styles/typography.module.css": "/* Typography styles */",
    "src/assets/styles/layout.module.css": "/* Layout styles */",
    "src/assets/variables/colors.js": "export default { primary: '#007bff' };",
    "src/assets/variables/metrics.js": "export default { spacing: '16px' };",
    "src/routes/index.js": "import { Routes, Route } from 'react-router-dom';",
    "src/routes/history.js": "import { createBrowserHistory } from 'history'; export default createBrowserHistory();",
    "src/pages/Welcome/index.js": "export default function Welcome() { return <h1>Welcome</h1>; }",
    "src/pages/LandingPage/index.js": "export default function LandingPage() { return <h1>Landing Page</h1>; }",
    "src/constants/buttons.js": "export const buttons = [];",
    "src/utils/lenis.js": "export function smoothScroll() {}",
}

# Create directories
for directory in directories:
    os.makedirs(os.path.join(BASE_DIR, directory), exist_ok=True)

# Create component files and their module CSS
components = [
    "FaqSection",
    "SliderAnimation",
    "animationSection",
    "carouselAlgo",
    "companiesWorking",
    "customerJourney",
    "desktopFooterSection",
    "featureSection",
    "footer",
    "footerSection",
    "getJobs",
    "getStartedSection",
    "heroSection",
    "mobileFooterSection",
    "navbar",
    "responsiveAnimationSection",
    "resumeCarousel",
    "tempelatePage",
    "testimonialSection",
    "verticalAnimationSection",
]

for component in components:
    component_dir = f"src/components/landingPage/{component}"
    component_file = os.path.join(BASE_DIR, component_dir, f"{component}.js")
    module_css_file = os.path.join(BASE_DIR, component_dir, f"{component}.module.css")
    
    # Create component file with basic structure
    with open(component_file, "w") as f:
        f.write(f"""import styles from './{component}.module.css';
export default function {component}() {{
  return <div className={{styles.container}}>{component}</div>;
}}
""")

    # Create corresponding CSS module file
    with open(module_css_file, "w") as f:
        f.write(f""".container {{
  /* Styles for {component} */
}}
""")

# Create other key files with content
for file_path, content in files_with_content.items():
    full_path = os.path.join(BASE_DIR, file_path)
    with open(full_path, "w") as f:
        f.write(content)

print(f"✅ React 18 project structure created successfully in '{BASE_DIR}'!")
