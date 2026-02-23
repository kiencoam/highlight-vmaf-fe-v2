# Quick Start Guide - Highlight VMAF Frontend

## 🚀 Running the Application

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open Browser

Navigate to: **http://localhost:3000**

---

## 📖 User Guide

### Page 1: Videos List (Home Page)

**Features:**

- 🔍 **Search**: Type a video title and click "Search"
- 📊 **Filter by Status**: Select from Pending/Processing/Completed/Failed
- 🔢 **Items per page**: Choose 10, 20, 50, or 100 items
- ⬆️⬇️ **Sort**: By ID, Title, or Status (Ascending/Descending)
- 📄 **Pagination**: Navigate through pages at the bottom

**Actions:**

- Click "**View Details →**" on any video to see its highlights

---

### Page 2: Video Detail

**Layout:**

1. **Top Section**: Two video players side-by-side
   - Left: Original Video
   - Right: Highlight Video

2. **Bottom Section**: List of Highlights
   - Each row shows: Highlight ID, Duration, VMAF scores (Mean, Min, Max)
   - Click any highlight row to expand and see frames

**Highlight Information:**

- **Duration**: Length of the highlight segment in seconds
- **VMAF Mean**: Average quality score
- **VMAF Min**: Minimum quality in the segment
- **VMAF Max**: Maximum quality in the segment

---

### Frames View (Inside Expanded Highlight)

**Layout:**

- Each frame displayed in a card with:
  - **Frame Number**: Sequential frame number
  - **VMAF Score**: Quality score with color-coded badge
  - **Side-by-side Images**: Original frame (left) vs Highlight frame (right)
  - **Quality Bar**: Visual indicator of VMAF score

**VMAF Score Colors:**

- 🟢 **Green (90-100)**: Excellent quality
- 🟡 **Yellow (75-89)**: Good quality
- 🟠 **Orange (50-74)**: Fair quality
- 🔴 **Red (0-49)**: Poor quality

**Pagination:**

- Navigate through frames using Previous/Next buttons
- Default: 10 frames per page

---

## 🎯 Common Workflows

### Workflow 1: Find a Specific Video

1. On home page, type title in search box
2. Click "Search" button
3. Click "View Details →" on the video

### Workflow 2: Check Completed Videos

1. Select "Completed" from Status dropdown
2. Browse results
3. Click on any video to analyze

### Workflow 3: Analyze Video Quality

1. Open video detail page
2. Watch both videos to compare
3. Expand highlights to see frame-by-frame comparison
4. Review VMAF scores for quality assessment

### Workflow 4: Find Low Quality Frames

1. Open video detail page
2. Expand highlights one by one
3. Look for frames with low VMAF scores (red/orange indicators)
4. Use pagination to check all frames

---

## 🎨 Interface Elements

### Status Badges

- 🟡 **Pending**: Yellow badge
- 🔵 **Processing**: Blue badge
- 🟢 **Completed**: Green badge
- 🔴 **Failed**: Red badge

### Buttons

- **Blue buttons**: Primary actions (Search, View Details)
- **Gray buttons**: Secondary actions (Pagination)
- **Underlined text**: Reset/Clear actions

### Interactive Elements

- **Dropdown triangles**: Click to expand/collapse
- **Hover effects**: Table rows and buttons highlight on hover
- **Disabled state**: Grayed out when not available

---

## ⌨️ Keyboard Shortcuts

- **Enter** in search box: Trigger search
- **Click dropdown**: Expand/collapse without scrolling

---

## 💡 Tips

1. **Use filters**: Combine search + status filter for precise results
2. **Adjust page size**: Use larger page sizes (50-100) to see more videos at once
3. **Sort strategically**: Sort by Status to quickly find completed videos
4. **Frame analysis**: Pay attention to VMAF min scores - they indicate worst quality moments
5. **Pagination**: Frame counts can be large, use pagination efficiently

---

## ⚠️ Troubleshooting

### Videos not loading

- Check internet connection
- Verify API is accessible at: https://audio3.tivi360.vn
- Refresh the page

### Images not displaying

- Images may take time to load
- Check if URL is valid in the API response
- Some videos may not have frame images yet

### Video players not working

- Ensure video URL is accessible
- Check browser console for errors
- Try a different browser (Chrome/Firefox recommended)

---

## 🏗️ Development

### Project Structure

```
app/
  components/       # Reusable components
    VideosList.tsx  # Videos table with filters
    FramesList.tsx  # Frames display
  videos/[id]/      # Dynamic video detail route
    page.tsx        # Video detail page
  page.tsx          # Home page

lib/
  api.ts           # API client
  types.ts         # TypeScript types
```

### Adding Features

- API calls: Edit `lib/api.ts`
- Types: Edit `lib/types.ts`
- Videos list UI: Edit `app/components/VideosList.tsx`
- Video detail UI: Edit `app/videos/[id]/page.tsx`
- Frames UI: Edit `app/components/FramesList.tsx`

---

## 📚 Further Reading

- [README.md](README.md) - Complete documentation
- [API_DOCS.md](API_DOCS.md) - API reference
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation

---

**Need Help?** Contact the development team.
