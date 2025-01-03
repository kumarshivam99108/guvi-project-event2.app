# PowerShell script to download images

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "images/backgrounds"
New-Item -ItemType Directory -Force -Path "images/events"
New-Item -ItemType Directory -Force -Path "images/testimonials"


# Background Images
Download-Image -Url "https://source.unsplash.com/1531058020387-3be344556be6" -Path "images/backgrounds/hero-bg-1.jpg"
Download-Image -Url "https://source.unsplash.com/1469371670807-013ccf25f16a" -Path "images/backgrounds/hero-bg-2.jpg"

# Event Images
Download-Image -Url "https://source.unsplash.com/1519167758481-83f550bb49b3" -Path "images/events/corporate-1.jpg"
Download-Image -Url "https://source.unsplash.com/1544928147-79a2dbc1f389" -Path "images/events/corporate-2.jpg"
Download-Image -Url "https://source.unsplash.com/1540575467063-178a50c2df87" -Path "images/events/conference-1.jpg"
Download-Image -Url "https://source.unsplash.com/1505373877841-8d25f7d46678" -Path "images/events/conference-2.jpg"
Download-Image -Url "https://source.unsplash.com/1532712938310-34cb3982ef74" -Path "images/events/wedding-1.jpg"
Download-Image -Url "https://source.unsplash.com/1492684223066-81342ee5ff30" -Path "images/events/social-1.jpg"
Download-Image -Url "https://source.unsplash.com/1496337589254-7e19d01cec44" -Path "images/events/social-2.jpg"

# Testimonial Images
Download-Image -Url "https://source.unsplash.com/1494790108377-be9c29b29330" -Path "images/testimonials/client-1.jpg"
Download-Image -Url "https://source.unsplash.com/1507003211169-0a1dd7228f2d" -Path "images/testimonials/client-2.jpg"
Download-Image -Url "https://source.unsplash.com/1438761681033-6461ffad8d80" -Path "images/testimonials/client-3.jpg"

Write-Host "All images have been downloaded!"
