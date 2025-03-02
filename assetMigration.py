import os
import shutil

# Define source (Next.js public/) and destination (React 18 src/assets/)
SOURCE_DIR = "/home/m3phi5t0/myfuselandingpage/public"
DEST_DIR = "/home/m3phi5t0/myfuse_landing_page/src/assets"

# Define the new structure mapping
DIRECTORY_MAP = {
    "fonts/Figtree": "fonts/Figtree",
    "fonts/Plus_Jakarta_Sans": "fonts/PlusJakartaSans",
    "fonts/Space_Grotesk": "fonts/SpaceGrotesk",
    "landingPage/animations": "images/animations",
    "landingPage/backgrounds": "images/backgrounds",
    "landingPage/companylogos": "images/logos",
    "landingPage/icons": "images/icons",
    "landingPage/profile": "images/profile",
    "landingPage/resumeTemplates": "images/resumeTemplates",
    "landingPage/story": "images/story",
    "landingPage/story_big": "images/story/story_big",
    "landingPage/story_small": "images/story/story_small",
}

# Exclude certain file types
EXCLUDE_FILES = ["OFL.txt", "README.txt"]

# Create necessary directories
for _, dest_subdir in DIRECTORY_MAP.items():
    os.makedirs(os.path.join(DEST_DIR, dest_subdir), exist_ok=True)

# Function to copy assets while maintaining the structure
def copy_assets():
    for src_subdir, dest_subdir in DIRECTORY_MAP.items():
        src_path = os.path.join(SOURCE_DIR, src_subdir)
        dest_path = os.path.join(DEST_DIR, dest_subdir)

        if os.path.exists(src_path):
            for file in os.listdir(src_path):
                file_path = os.path.join(src_path, file)
                if os.path.isfile(file_path) and file not in EXCLUDE_FILES:
                    shutil.copy(file_path, os.path.join(dest_path, file))

    # Move other root-level files
    root_files = [
        "file.svg",
        "globe.svg",
        "hero-image.png",
        "hero-left.png",
        "resume.svg",
        "resume.png",
        "vercel.svg",
        "window.svg"
    ]
    
    for file in root_files:
        src_file = os.path.join(SOURCE_DIR, file)
        dest_file = os.path.join(DEST_DIR, "images", file)
        
        if os.path.exists(src_file):
            os.makedirs(os.path.join(DEST_DIR, "images"), exist_ok=True)
            shutil.copy(src_file, dest_file)

# Run the function
copy_assets()

print(f"✅ Assets migrated successfully from `{SOURCE_DIR}` to `{DEST_DIR}`")
