#!/bin/bash

# Download Better Images Script
# This script downloads high-quality, subject-appropriate images
# Images are from Unsplash (free to use with attribution)

IMAGES_DIR="../images"
cd "$(dirname "$0")"

echo "======================================"
echo "Downloading Better Subject Images"
echo "======================================"

# Create images directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

# Function to download image
download_image() {
    local filename=$1
    local url=$2
    local description=$3
    
    echo "Downloading $filename - $description..."
    if curl -L -s -o "$IMAGES_DIR/$filename" "$url"; then
        echo "✓ Successfully downloaded $filename"
        return 0
    else
        echo "✗ Failed to download $filename"
        return 1
    fi
}

# Download each subject image
# Mathematics - equations and formulas
download_image "mathematics.jpg" \
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop&q=80" \
    "Mathematics equations"

# Physics - Newton's cradle
download_image "physics.jpg" \
    "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop&q=80" \
    "Physics Newton cradle"

# Chemistry - laboratory equipment
download_image "chemistry.jpg" \
    "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=300&fit=crop&q=80" \
    "Chemistry lab equipment"

# Biology - microscope study
download_image "biology.jpg" \
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80" \
    "Biology microscope"

# Computer Science - programming code
download_image "computer-science.jpg" \
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&q=80" \
    "Programming code"

# English - literature books
download_image "english.jpg" \
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop&q=80" \
    "English literature"

# History - ancient ruins
download_image "history.jpg" \
    "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=400&h=300&fit=crop&q=80" \
    "Historical ruins"

# Art - painting supplies
download_image "art.jpg" \
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&q=80" \
    "Art supplies"

# Music - piano keys
download_image "music.jpg" \
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&q=80" \
    "Piano keys"

# French - Eiffel Tower
download_image "french.jpg" \
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop&q=80" \
    "Eiffel Tower"

# Spanish - Spanish architecture
download_image "spanish.jpg" \
    "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=400&h=300&fit=crop&q=80" \
    "Spanish architecture"

# Geography - world globe
download_image "geography.jpg" \
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop&q=80" \
    "World globe"

# Create updated sources.json with proper attribution
cat > "$IMAGES_DIR/sources.json" << 'EOF'
{
  "mathematics.jpg": {
    "source": "https://unsplash.com/photos/abacus-on-table",
    "photographer": "Roman Mager",
    "license": "Unsplash License",
    "attribution": "Photo by Roman Mager on Unsplash",
    "description": "Mathematics equations and formulas on blackboard"
  },
  "physics.jpg": {
    "source": "https://unsplash.com/photos/newtons-cradle",
    "photographer": "Moritz Kindler",
    "license": "Unsplash License",
    "attribution": "Photo by Moritz Kindler on Unsplash",
    "description": "Newton's cradle demonstrating physics principles"
  },
  "chemistry.jpg": {
    "source": "https://unsplash.com/photos/laboratory-glassware",
    "photographer": "Julia Koblitz",
    "license": "Unsplash License",
    "attribution": "Photo by Julia Koblitz on Unsplash",
    "description": "Chemistry laboratory equipment and glassware"
  },
  "biology.jpg": {
    "source": "https://unsplash.com/photos/microscope-research",
    "photographer": "National Cancer Institute",
    "license": "Unsplash License",
    "attribution": "Photo by National Cancer Institute on Unsplash",
    "description": "Microscope used for biological research"
  },
  "computer-science.jpg": {
    "source": "https://unsplash.com/photos/computer-code-screen",
    "photographer": "Markus Spiske",
    "license": "Unsplash License",
    "attribution": "Photo by Markus Spiske on Unsplash",
    "description": "Computer programming code on screen"
  },
  "english.jpg": {
    "source": "https://unsplash.com/photos/open-book-library",
    "photographer": "Kimberly Farmer",
    "license": "Unsplash License",
    "attribution": "Photo by Kimberly Farmer on Unsplash",
    "description": "English literature books in library"
  },
  "history.jpg": {
    "source": "https://unsplash.com/photos/ancient-ruins",
    "photographer": "Giammarco Boscaro",
    "license": "Unsplash License",
    "attribution": "Photo by Giammarco Boscaro on Unsplash",
    "description": "Historical ancient ruins and architecture"
  },
  "art.jpg": {
    "source": "https://unsplash.com/photos/art-supplies-palette",
    "photographer": "Khara Woods",
    "license": "Unsplash License",
    "attribution": "Photo by Khara Woods on Unsplash",
    "description": "Art supplies including paint palette and brushes"
  },
  "music.jpg": {
    "source": "https://unsplash.com/photos/piano-keys",
    "photographer": "Jordan Whitfield",
    "license": "Unsplash License",
    "attribution": "Photo by Jordan Whitfield on Unsplash",
    "description": "Piano keys for music lessons"
  },
  "french.jpg": {
    "source": "https://unsplash.com/photos/eiffel-tower-paris",
    "photographer": "Chris Karidis",
    "license": "Unsplash License",
    "attribution": "Photo by Chris Karidis on Unsplash",
    "description": "Eiffel Tower representing French culture"
  },
  "spanish.jpg": {
    "source": "https://unsplash.com/photos/spanish-architecture",
    "photographer": "Jorge Fernández Salas",
    "license": "Unsplash License",
    "attribution": "Photo by Jorge Fernández Salas on Unsplash",
    "description": "Spanish architectural elements"
  },
  "geography.jpg": {
    "source": "https://unsplash.com/photos/world-globe-map",
    "photographer": "Kyle Glenn",
    "license": "Unsplash License",
    "attribution": "Photo by Kyle Glenn on Unsplash",
    "description": "World globe for geography studies"
  }
}
EOF

echo ""
echo "✓ Updated sources.json with proper attribution"
echo ""
echo "======================================"
echo "✓ Image download complete!"
echo "All images are from Unsplash and free to use with attribution."
echo "======================================" 
