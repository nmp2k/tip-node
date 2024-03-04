#!/bin/bash

# Define a function to process a directory
process_directory() {
    local dir="$1"
    # Print a message indicating the directory being checked
    echo "checking folder $dir..."
    # Change directory to the specified directory, exit if it fails
    cd "$dir" || exit 1
    
    # Loop through each file in the directory
    for file in *; do
        # If the file is a directory and not named "node_modules", then process the directory
        if [ -d "$file" ] && [ "$file" != "node_modules" ]; then
            process_directory "$file"
        # If the file is a regular file and not named "node_modules", then process the file
        elif [ -f "$file" ] && [ "$file" != "node_modules" ]; then
            # Print a message indicating the file being checked
            echo "checking file $file..."
            # Get the filename and extension of the file
            filename=$(basename -- "$file")
            extension=$(echo "$filename" | sed 's/.*\.//')
            # If the file has a "js" extension, then rename it to have a "ts" extension
            if [ "$extension" = "js" ]; then
                # Rename the file from .js to .ts
                newname="${file%.js}.ts"
                mv "$file" "$newname"
                # Print a message indicating the file has been renamed
                echo "renamed file $file to $newname"
            fi
        fi
    done

    # Move back to the parent directory
    cd ..
}

# Process each file in the current directory except for the "node_modules" directory
for file in *; do
    # If the file is a directory and not named "node_modules", then process the directory
    if [ -d "$file" ] && [ "$file" != "node_modules" ]; then
        process_directory "$file"
    # If the file is a regular file and not named "node_modules", then process the file
    elif [ -f "$file" ] && [ "$file" != "node_modules" ]; then
        # Print a message indicating the file being checked
        echo "checking file $file..."
        # Get the filename and extension of the file
        filename=$(basename -- "$file")
        extension=$(echo "$filename" | sed 's/.*\.//')
        # If the file has a "js" extension, then rename it to have a "ts" extension
        if [ "$extension" = "js" ]; then
            # Rename the file from .js to .ts
            newname="${file%.js}.ts"
            mv "$file" "$newname"
            # Print a message indicating the file has been renamed
            echo "renameed file $file to $newname"
        fi
    fi
done