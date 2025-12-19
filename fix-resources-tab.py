#!/usr/bin/env python3
# Quick script to fix the Resources tab by removing interviews content and keeping only templates

with open('index.html', 'r') as f:
    content = f.read()

# Find and mark the sections
resources_start = content.find('<!-- Resources Tab -->')
templates_start = content.find('<!-- Templates Tab -->')
templates_content_start = content.find('<h2>Email Templates</h2>', templates_start)
end_of_templates_div = content.find('</div>\n    </div>\n    \n    <!-- Customization Sidebar -->')

# Extract the templates content (from h2 to the end of that div)
templates_content = content[templates_content_start:end_of_templates_div]

# Find where to insert (after the Resources tab opening and new header)
insert_point = content.find('</p>', resources_start) + 4  # After the closing </p> tag

# Find where interviews content ends (before Templates Tab comment)
remove_end = templates_start

# Replace: remove interviews content, keep templates content once
new_content = (
    content[:insert_point] + '\n            ' + 
    templates_content.strip() + '\n        ' +
    content[end_of_templates_div:]
)

# Now remove the duplicate Templates tab
templates_tab_start = new_content.find('<!-- Templates Tab -->')
if templates_tab_start > 0:
    templates_tab_end = new_content.find('</div>\n        \n        <!-- Customization Sidebar -->', templates_tab_start)
    if templates_tab_end > 0:
        new_content = new_content[:templates_tab_start] + '        \n        ' + new_content[templates_tab_end+13:]

with open('index.html', 'w') as f:
    f.write(new_content)

print("Fixed Resources tab!")
