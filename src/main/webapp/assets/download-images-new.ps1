# Create directories if they don't exist
$directories = @(
    "images/backgrounds",
    "images/events",
    "images/testimonials"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
}

# Image URLs and their target paths
$imageUrls = @{
    # Background images
    "https://images.unsplash.com/photo-1531058020387-3be344556be6" = "images/backgrounds/photo-1531058020387-3be344556be6.jpeg"
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a" = "images/backgrounds/photo-1469371670807-013ccf25f16a.jpeg"
    
    # Event images
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30" = "images/events/photo-1492684223066-81342ee5ff30.jpeg"
    "https://images.unsplash.com/photo-1496337589254-7e19d01cec44" = "images/events/photo-1496337589254-7e19d01cec44.jpeg"
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678" = "images/events/photo-1505373877841-8d25f7d46678.jpeg"
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3" = "images/events/photo-1519167758481-83f550bb49b3.jpeg"
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74" = "images/events/photo-1532712938310-34cb3982ef74.jpeg"
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87" = "images/events/photo-1540575467063-178a50c2df87.jpeg"
    "https://images.unsplash.com/photo-1544928147-79a2dbc1f389" = "images/events/photo-1544928147-79a2dbc1f389.jpeg"
    
    # Testimonial images
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330" = "images/testimonials/photo-1494790108377-be9c29b29330.jpeg"
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" = "images/testimonials/photo-1507003211169-0a1dd7228f2d.jpeg"
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" = "images/testimonials/photo-1438761681033-6461ffad8d80.jpeg"
}

# Download images
foreach ($url in $imageUrls.Keys) {
    $targetPath = $imageUrls[$url]
    Write-Host "Downloading $url to $targetPath..."
    
    try {
        Invoke-WebRequest -Uri "$url?w=1200&q=80" -OutFile $targetPath
        Write-Host "Successfully downloaded $targetPath"
    }
    catch {
        Write-Host "Failed to download $url : $_"
    }
}
