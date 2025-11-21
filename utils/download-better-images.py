#!/usr/bin/env python3
"""
Download Better Images Script
This script downloads high-quality, subject-appropriate images for each lesson.
Images are from Unsplash (free to use with attribution).
"""

import os
import requests
import json
from pathlib import Path

# Directory setup
script_dir = Path(__file__).parent
images_dir = script_dir.parent / 'images'
images_dir.mkdir(exist_ok=True)

# Unsplash API (using demo/free images that don't require API key)
# These are direct image URLs from Unsplash with appropriate licenses
image_urls = {
    'mathematics.jpg': {
        'url': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
        'description': 'Mathematics equations on blackboard',
        'photographer': 'Roman Mager',
        'license': 'Unsplash License'
    },
    'physics.jpg': {
        'url': 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
        'description': 'Physics Newton cradle',
        'photographer': 'Moritz Kindler',
        'license': 'Unsplash License'
    },
    'chemistry.jpg': {
        'url': 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=300&fit=crop',
        'description': 'Chemistry laboratory equipment',
        'photographer': 'Julia Koblitz',
        'license': 'Unsplash License'
    },
    'biology.jpg': {
        'url': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        'description': 'Biology microscope study',
        'photographer': 'National Cancer Institute',
        'license': 'Unsplash License'
    },
    'computer-science.jpg': {
        'url': 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
        'description': 'Computer programming code',
        'photographer': 'Markus Spiske',
        'license': 'Unsplash License'
    },
    'english.jpg': {
        'url': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop',
        'description': 'English literature books',
        'photographer': 'Kimberly Farmer',
        'license': 'Unsplash License'
    },
    'history.jpg': {
        'url': 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=400&h=300&fit=crop',
        'description': 'Historical ancient ruins',
        'photographer': 'Giammarco Boscaro',
        'license': 'Unsplash License'
    },
    'art.jpg': {
        'url': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
        'description': 'Art supplies and palette',
        'photographer': 'Khara Woods',
        'license': 'Unsplash License'
    },
    'music.jpg': {
        'url': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        'description': 'Music piano keys',
        'photographer': 'Jordan Whitfield',
        'license': 'Unsplash License'
    },
    'french.jpg': {
        'url': 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
        'description': 'French Eiffel Tower',
        'photographer': 'Chris Karidis',
        'license': 'Unsplash License'
    },
    'spanish.jpg': {
        'url': 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=400&h=300&fit=crop',
        'description': 'Spanish architecture',
        'photographer': 'Jorge Fernández Salas',
        'license': 'Unsplash License'
    },
    'geography.jpg': {
        'url': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop',
        'description': 'Geography world globe',
        'photographer': 'Kyle Glenn',
        'license': 'Unsplash License'
    }
}

def download_image(filename, image_info):
    """Download a single image from URL"""
    try:
        print(f"Downloading {filename}...")
        response = requests.get(image_info['url'], stream=True)
        response.raise_for_status()
        
        filepath = images_dir / filename
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✓ Successfully downloaded {filename}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {filename}: {e}")
        return False

def update_sources_json():
    """Update the sources.json file with attribution information"""
    sources = {}
    for filename, info in image_urls.items():
        sources[filename] = {
            'source': info['url'],
            'description': info['description'],
            'photographer': info['photographer'],
            'license': info['license'],
            'attribution': f"Photo by {info['photographer']} on Unsplash"
        }
    
    sources_path = images_dir / 'sources.json'
    with open(sources_path, 'w') as f:
        json.dump(sources, f, indent=2)
    
    print("✓ Updated sources.json with attribution")

def main():
    """Main function to download all images"""
    print("=" * 50)
    print("Downloading Better Subject Images")
    print("=" * 50)
    
    success_count = 0
    for filename, info in image_urls.items():
        if download_image(filename, info):
            success_count += 1
    
    print(f"\nDownloaded {success_count}/{len(image_urls)} images")
    
    # Update sources.json
    update_sources_json()
    
    print("\n✓ All done! Images are ready for use.")
    print("Note: These images are from Unsplash and free to use.")

if __name__ == '__main__':
    main()
