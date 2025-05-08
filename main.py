import os
import datetime
from pathlib import Path

def export_project_data(folder_path):
    # Create output directory
    output_dir = Path('project_exports')
    output_dir.mkdir(exist_ok=True)
    
    # Prepare metadata header
    metadata = {
        'export_timestamp': datetime.datetime.now().isoformat(),
        'source_folder': str(Path(folder_path).resolve()),
        'total_files': 0,
        'total_size': 0
    }

    # Prepare output content
    output_content = []
    
    # Walk through directory tree
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = Path(root) / file
            
            # Skip binary files and hidden files
            if file.startswith('.') or is_binary(file_path):
                continue
            
            # Get file metadata
            file_stat = file_path.stat()
            metadata['total_files'] += 1
            metadata['total_size'] += file_stat.st_size
            
            # Add file header
            output_content.append(f"\n\n=== FILE: {file_path.relative_to(folder_path)} ===")
            output_content.append(f"• Path: {file_path}")
            output_content.append(f"• Size: {file_stat.st_size} bytes")
            output_content.append(f"• Created: {datetime.datetime.fromtimestamp(file_stat.st_ctime).isoformat()}")
            output_content.append(f"• Modified: {datetime.datetime.fromtimestamp(file_stat.st_mtime).isoformat()}")
            
            # Add file content
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    output_content.append("\n```")
                    output_content.append(f.read())
                    output_content.append("```")
            except UnicodeDecodeError:
                output_content.append("\n[Binary content omitted]")
            except Exception as e:
                output_content.append(f"\n[Error reading file: {str(e)}]")

    # Create final output
    final_output = []
    final_output.append("=== PROJECT METADATA ===")
    for key, value in metadata.items():
        final_output.append(f"{key.ljust(20)}: {value}")
    
    final_output.append("\n\n=== FILE CONTENTS ===")
    final_output.extend(output_content)

    # Generate output filename
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = output_dir / f'project_export_{timestamp}.txt'
    
    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(final_output))

    print(f"Successfully exported {metadata['total_files']} files to {output_file}")

def is_binary(file_path):
    """Check if a file is binary"""
    try:
        with open(file_path, 'rb') as f:
            return b'\0' in f.read(1024)
    except:
        return False

if __name__ == '__main__':
    target_folder = input("Enter path to your src folder: ").strip()
    export_project_data(target_folder) I:\smriti-main-mobile\latest-smriti\latest-mobile-code\src