import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

input_path = "/home/arun/PROP-CARE/public/newlogo.png"
output_path = "/home/arun/PROP-CARE/public/newlogo_light.png"

img = Image.open(input_path).convert("RGBA")
pixels = img.load()

for y in range(img.height):
    for x in range(img.width):
        r, g, b, a = pixels[x, y]
        if a > 0:
            # Check if pixel is dark (navy blue)
            # Navy blue is around (22, 50, 63), Gold is (184, 134, 59)
            # A simple check: if the sum of rgb is low (e.g. < 250), it's the dark blue
            if r + g + b < 300:
                # Turn it pure white
                pixels[x, y] = (255, 255, 255, a)

img.save(output_path, "PNG")
print("Saved light logo to:", output_path)
