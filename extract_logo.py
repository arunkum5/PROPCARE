import sys
try:
    from PIL import Image, ImageOps, ImageEnhance
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageOps, ImageEnhance

input_path = "/home/arun/.gemini/antigravity/brain/4bc73132-09fd-41dd-9cd8-6ad782c1d4b6/trustwork_logo_1788362295757.png"
output_path = "/home/arun/.gemini/antigravity/brain/4bc73132-09fd-41dd-9cd8-6ad782c1d4b6/trustwork_icon_transparent.png"

# Open the image
img = Image.open(input_path).convert("RGBA")

# Crop the image to just the top half (where the icon is)
# Assuming 1024x1024 image. The icon is roughly from y=100 to y=620, x=250 to x=774
# Let's crop it tightly around the icon
width, height = img.size
cropped = img.crop((150, 150, width - 150, 620))

# To remove the background cleanly, we'll convert to grayscale for a mask
gray = cropped.convert("L")

# Anything lighter than 220 becomes pure white (background), darker than 150 becomes black
# We will use point to map values
def map_pixel(p):
    if p > 220:
        return 0 # Transparent
    elif p < 150:
        return 255 # Fully opaque
    else:
        # Smooth transition for anti-aliasing
        return int(255 * (220 - p) / (220 - 150))

alpha_mask = gray.point(map_pixel)

# Apply the alpha mask to the original cropped image
cropped.putalpha(alpha_mask)

# Save the final transparent PNG
cropped.save(output_path, "PNG")

print("Saved transparent icon to:", output_path)
