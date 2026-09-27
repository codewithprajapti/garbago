import math
import subprocess
import os

WIDTH = 512
HEIGHT = 512

def create_svg():
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Radial Gradient: Deep Royal Indigo / Midnight Purple -->
    <radialGradient id="garbaBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#2d1057" />
      <stop offset="60%" stop-color="#180735" />
      <stop offset="100%" stop-color="#0e0024" />
    </radialGradient>

    <!-- Warm Festive Gold Gradients -->
    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="35%" stop-color="#cca830" />
      <stop offset="70%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>

    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="60%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <!-- Vibrant Saffron / Gujarati Orange Gradients for Diya Vessel -->
    <linearGradient id="diyaBase" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff7518" />
      <stop offset="45%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#be3a05" />
    </linearGradient>

    <linearGradient id="diyaRim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="25%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#fef08a" />
      <stop offset="75%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <!-- Divine Navratri Jyoti Flame Gradients -->
    <linearGradient id="flameOuter" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="30%" stop-color="#f97316" />
      <stop offset="70%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fde047" />
    </linearGradient>

    <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#fffbeb" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>

    <linearGradient id="flameCore" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fef9c3" />
    </linearGradient>
  </defs>

  <!-- Base Circular Badge -->
  <circle cx="256" cy="256" r="240" fill="url(#garbaBg)" />

  <!-- Outer Festive Gold Ring -->
  <circle cx="256" cy="256" r="236" fill="none" stroke="url(#goldBorder)" stroke-width="8" />
  
  <!-- Subtle Inner Ring -->
  <circle cx="256" cy="256" r="224" fill="none" stroke="#cca830" stroke-width="1.5" stroke-opacity="0.45" />

  <!-- Circular Garba Dance Rhythm Ring (Garba Mandali Circle) -->
  <circle cx="256" cy="256" r="184" fill="none" stroke="#cca830" stroke-width="2" stroke-dasharray="6 8" stroke-opacity="0.5" />

  <!-- 8 Auspicious Garba Dance Petals / Flame Accents symbolizing circular celebration -->
  <g transform="translate(256, 256)">
    <g transform="rotate(0)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(45)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(90)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(135)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(180)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(225)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(270)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
    <g transform="rotate(315)"><path d="M 0,-184 C -5,-172 0,-160 0,-160 C 0,-160 5,-172 0,-184 Z" fill="url(#goldAccent)" /></g>
  </g>

  <!-- Radiant Aura behind Flame -->
  <circle cx="256" cy="216" r="92" fill="#fbbf24" fill-opacity="0.12" />

  <!-- Sacred Jyoti Flame (Navratri Divine Flame) -->
  <!-- Outer Flame Layer -->
  <path d="M 256,108 C 268,154 316,204 316,256 C 316,290 289,314 256,314 C 223,314 196,290 196,256 C 196,204 244,154 256,108 Z" fill="url(#flameOuter)" />

  <!-- Mid Flame Layer -->
  <path d="M 256,136 C 265,172 298,212 298,254 C 298,278 279,298 256,298 C 233,298 214,278 214,254 C 214,212 247,172 256,136 Z" fill="url(#flameInner)" />

  <!-- Inner Sacred Core Light -->
  <path d="M 256,178 C 263,206 280,234 280,258 C 280,274 269,286 256,286 C 243,286 232,274 232,258 C 232,234 249,206 256,178 Z" fill="url(#flameCore)" />

  <!-- Traditional Gujarati Diya (Earthen Lamp Bowl) -->
  <!-- Diya Base Shadow -->
  <ellipse cx="256" cy="372" rx="94" ry="12" fill="#070014" fill-opacity="0.5" />

  <!-- Diya Terracotta/Brass Vessel -->
  <path d="M 146,306 C 156,370 218,386 256,386 C 294,386 356,370 366,306 C 332,328 296,336 256,336 C 216,336 180,328 146,306 Z" fill="url(#diyaBase)" />

  <!-- Diya Golden Rim / Lip -->
  <path d="M 146,306 C 180,328 216,336 256,336 C 296,336 332,328 366,306 C 344,297 300,290 256,290 C 212,290 168,297 146,306 Z" fill="url(#diyaRim)" />

  <!-- Auspicious Diya Golden Jewels -->
  <circle cx="256" cy="354" r="5" fill="#fde047" />
  <circle cx="224" cy="348" r="3.5" fill="#fde047" fill-opacity="0.85" />
  <circle cx="288" cy="348" r="3.5" fill="#fde047" fill-opacity="0.85" />
</svg>'''
    return svg_content

def blend(c1, c2, factor):
    """Linear interpolation between two RGBA colors"""
    factor = max(0.0, min(1.0, factor))
    return [
        int(c1[0] + (c2[0] - c1[0]) * factor),
        int(c1[1] + (c2[1] - c1[1]) * factor),
        int(c1[2] + (c2[2] - c1[2]) * factor),
        int(c1[3] + (c2[3] - c1[3]) * factor),
    ]

def render_raster_pam(width, height):
    """
    Renders high-quality pixel buffer into Netpbm PAM format (RGBA).
    Uses mathematical distance geometry with subpixel anti-aliasing.
    """
    cx, cy = 256.0, 256.0
    buffer = bytearray(width * height * 4)

    # Predefined color palettes (RGBA)
    c_deep_purple_center = [45, 16, 87, 255]
    c_indigo_mid = [24, 7, 53, 255]
    c_midnight_edge = [14, 0, 36, 255]
    c_gold_border_light = [253, 224, 71, 255]
    c_gold_border_dark = [204, 168, 48, 255]
    c_gold_accent = [251, 191, 36, 255]
    c_gold_pale = [254, 240, 138, 255]
    
    # Flame colors
    c_flame_outer_tip = [253, 224, 71, 255]
    c_flame_outer_mid = [249, 115, 22, 255]
    c_flame_outer_base = [234, 88, 12, 255]
    c_flame_inner_mid = [254, 240, 138, 255]
    c_flame_core = [255, 255, 255, 255]

    # Diya vessel colors
    c_diya_rim_gold = [251, 191, 36, 255]
    c_diya_orange_top = [255, 117, 24, 255]
    c_diya_orange_base = [190, 58, 5, 255]

    # Subsampling grid for anti-aliasing (2x2 = 4 samples per pixel)
    subsamples = [(-0.25, -0.25), (0.25, -0.25), (-0.25, 0.25), (0.25, 0.25)]

    for py in range(height):
        for px in range(width):
            r_acc, g_acc, b_acc, a_acc = 0, 0, 0, 0

            for sx, sy in subsamples:
                x = px + sx
                y = py + sy

                dx = x - cx
                dy = y - cy
                dist = math.hypot(dx, dy)

                if dist > 241.0:
                    continue  # Transparent outside circle badge

                # Background disk
                # Radial gradient from (256, 210)
                bg_d = math.hypot(x - 256.0, y - 210.0) / 240.0
                if bg_d < 0.5:
                    pix = blend(c_deep_purple_center, c_indigo_mid, bg_d * 2.0)
                else:
                    pix = blend(c_indigo_mid, c_midnight_edge, (bg_d - 0.5) * 2.0)

                # Outer Gold Border (r from 231 to 239)
                if 230.5 <= dist <= 240.0:
                    border_t = (dist - 230.5) / 9.5
                    # Angle based gold shine
                    ang = (math.atan2(dy, dx) + math.pi) / (2 * math.pi)
                    gold_shine = 0.5 + 0.5 * math.sin(ang * 4.0 * math.pi)
                    border_col = blend(c_gold_border_dark, c_gold_border_light, gold_shine)
                    pix = border_col

                # Subtle inner gold ring at r=224
                if 222.5 <= dist <= 224.5:
                    pix = blend(pix, c_gold_border_dark, 0.45)

                # Circular Garba Mandali Orbit ring (r=184)
                if 182.5 <= dist <= 185.5:
                    # Dashed orbit
                    ang = math.atan2(dy, dx)
                    dash = math.sin(ang * 32.0)
                    if dash > 0.1:
                        pix = blend(pix, c_gold_border_dark, 0.5)

                # 8 Garba Dance Petals / Accent Sparks at r=184, every 45 deg
                ang = math.atan2(dy, dx)
                ang_norm = (ang + 2 * math.pi) % (math.pi / 4.0)  # every 45 deg
                if ang_norm > math.pi / 8.0:
                    ang_norm -= math.pi / 4.0
                # Distance along ray and perpendicular
                p_r = dist - 184.0
                p_perp = dist * math.sin(ang_norm)
                if abs(p_r) <= 12.0 and abs(p_perp) <= 5.0 * (1.0 - abs(p_r) / 12.0):
                    petal_alpha = 1.0 - (abs(p_perp) / max(0.1, 5.0 * (1.0 - abs(p_r) / 12.0)))
                    pix = blend(pix, c_gold_accent, petal_alpha)

                # Warm festive flame aura
                flame_aura_d = math.hypot(x - 256.0, y - 220.0)
                if flame_aura_d < 90.0:
                    aura_int = (1.0 - flame_aura_d / 90.0) * 0.18
                    pix = blend(pix, c_gold_border_light, aura_int)

                # Sacred Jyoti Flame
                # Outer Flame: base (256, 314) up to tip (256, 108)
                flame_y = y
                if 108.0 <= flame_y <= 314.0:
                    # Normalized flame height [0 at tip, 1 at base]
                    fy = (flame_y - 108.0) / (314.0 - 108.0)
                    # Flame half-width profile: teardrop widest around fy=0.7
                    max_w = 60.0 * math.sin(fy * math.pi) * (0.4 + 0.6 * fy)
                    fx_dist = abs(x - 256.0)
                    if fx_dist <= max_w:
                        flame_f = (1.0 - fx_dist / max(0.1, max_w))
                        # Vertical gradient for outer flame
                        if fy < 0.4:
                            f_col = blend(c_flame_outer_tip, c_flame_outer_mid, fy / 0.4)
                        else:
                            f_col = blend(c_flame_outer_mid, c_flame_outer_base, (fy - 0.4) / 0.6)
                        pix = blend(pix, f_col, min(1.0, flame_f * 1.5))

                # Mid Flame Layer: tip at 136, base at 298
                if 136.0 <= flame_y <= 298.0:
                    fy_mid = (flame_y - 136.0) / (298.0 - 136.0)
                    max_w_mid = 42.0 * math.sin(fy_mid * math.pi) * (0.4 + 0.6 * fy_mid)
                    fx_dist_mid = abs(x - 256.0)
                    if fx_dist_mid <= max_w_mid:
                        f_mid_alpha = 1.0 - fx_dist_mid / max(0.1, max_w_mid)
                        f_mid_col = blend(c_flame_inner_mid, [255, 255, 255, 255], 1.0 - fy_mid)
                        pix = blend(pix, f_mid_col, min(1.0, f_mid_alpha * 1.8))

                # Inner Core Flame Light: tip at 178, base at 286
                if 178.0 <= flame_y <= 286.0:
                    fy_core = (flame_y - 178.0) / (286.0 - 178.0)
                    max_w_core = 24.0 * math.sin(fy_core * math.pi)
                    fx_dist_core = abs(x - 256.0)
                    if fx_dist_core <= max_w_core:
                        f_core_alpha = 1.0 - fx_dist_core / max(0.1, max_w_core)
                        pix = blend(pix, c_flame_core, min(1.0, f_core_alpha * 2.0))

                # Diya Vessel (Bowl & Lip)
                # Diya top lip curve: from x=146 to x=366, y around 306 - 336
                if 290.0 <= y <= 388.0 and abs(x - 256.0) <= 112.0:
                    rel_x = (x - 256.0) / 110.0  # -1 to 1
                    # Diya bottom curve: y_bottom(rel_x)
                    y_bottom = 306.0 + 80.0 * (1.0 - rel_x * rel_x)
                    # Diya rim top curve:
                    y_rim_top = 290.0 + 16.0 * (rel_x * rel_x)
                    # Diya rim bottom curve:
                    y_rim_bottom = 306.0 + 30.0 * (1.0 - rel_x * rel_x)

                    # Inside Diya golden rim
                    if y_rim_top <= y <= y_rim_bottom:
                        rim_x_grad = 0.5 + 0.5 * math.cos(rel_x * math.pi)
                        rim_col = blend(c_gold_accent, c_gold_pale, rim_x_grad)
                        pix = rim_col
                    elif y_rim_bottom < y <= y_bottom:
                        # Inside terracotta vessel
                        vessel_v = (y - y_rim_bottom) / max(0.1, y_bottom - y_rim_bottom)
                        vessel_col = blend(c_diya_orange_top, c_diya_orange_base, vessel_v)
                        pix = vessel_col

                # Auspicious golden gems on the diya bowl
                gem_dist_center = math.hypot(x - 256.0, y - 354.0)
                if gem_dist_center <= 5.5:
                    pix = c_gold_pale
                gem_dist_left = math.hypot(x - 224.0, y - 348.0)
                if gem_dist_left <= 4.0:
                    pix = c_gold_accent
                gem_dist_right = math.hypot(x - 288.0, y - 348.0)
                if gem_dist_right <= 4.0:
                    pix = c_gold_accent

                # Edge anti-aliasing of outer circle badge
                if dist > 239.0:
                    edge_alpha = max(0.0, min(1.0, (241.0 - dist) / 2.0))
                    pix[3] = int(pix[3] * edge_alpha)

                r_acc += pix[0]
                g_acc += pix[1]
                b_acc += pix[2]
                a_acc += pix[3]

            idx = (py * width + px) * 4
            buffer[idx] = r_acc // 4
            buffer[idx + 1] = g_acc // 4
            buffer[idx + 2] = b_acc // 4
            buffer[idx + 3] = a_acc // 4

    return buffer

def main():
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))
    tmp_dir = '/tmp/favicons'
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(tmp_dir, exist_ok=True)

    print(f"1. Creating {public_dir}/favicon.svg...")
    svg_data = create_svg()
    svg_path = os.path.join(public_dir, 'favicon.svg')
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_data)
    print("   Created favicon.svg successfully.")

    print("2. Rendering 512x512 master RGBA PAM image...")
    pam_buffer = render_raster_pam(WIDTH, HEIGHT)
    pam_path = os.path.join(tmp_dir, 'master.pam')
    with open(pam_path, 'wb') as f:
        header = f"P7\nWIDTH {WIDTH}\nHEIGHT {HEIGHT}\nDEPTH 4\nMAXVAL 255\nTUPLTYPE RGB_ALPHA\nENDHDR\n"
        f.write(header.encode('ascii'))
        f.write(pam_buffer)
    print("   Master PAM rendered.")

    print("3. Generating PNG assets using ImageMagick...")
    icon_512 = os.path.join(public_dir, 'icon-512.png')
    icon_192 = os.path.join(public_dir, 'icon-192.png')
    apple_icon = os.path.join(public_dir, 'apple-touch-icon.png')
    icon_48 = os.path.join(tmp_dir, 'icon-48.png')
    fav_32 = os.path.join(public_dir, 'favicon-32x32.png')
    fav_16 = os.path.join(public_dir, 'favicon-16x16.png')
    fav_ico = os.path.join(public_dir, 'favicon.ico')

    subprocess.run(['convert', pam_path, icon_512], check=True)
    subprocess.run(['convert', icon_512, '-resize', '192x192', icon_192], check=True)
    subprocess.run(['convert', icon_512, '-resize', '180x180', apple_icon], check=True)
    subprocess.run(['convert', icon_512, '-resize', '48x48', icon_48], check=True)
    subprocess.run(['convert', icon_512, '-resize', '32x32', fav_32], check=True)
    subprocess.run(['convert', icon_512, '-resize', '16x16', fav_16], check=True)

    # Multi-resolution ICO: 16x16, 32x32, 48x48
    print("4. Generating multi-resolution favicon.ico...")
    subprocess.run([
        'convert',
        fav_16,
        fav_32,
        icon_48,
        fav_ico
    ], check=True)

    print("5. Generating site.webmanifest for PWA / Android...")
    manifest = '''{
  "name": "GarbaGo — Your AI-Powered Navratri Companion",
  "short_name": "GarbaGo",
  "description": "Your AI-Powered Navratri Companion in Ahmedabad.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0e0024",
  "theme_color": "#0e0024",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    },
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
'''
    manifest_path = os.path.join(public_dir, 'site.webmanifest')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        f.write(manifest)

    print("All favicon assets generated successfully!")

if __name__ == '__main__':
    main()
