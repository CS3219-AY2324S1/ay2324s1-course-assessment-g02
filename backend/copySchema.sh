#!/bin/bash

# Define the path to the parent folder
parent_folder="$(dirname "$(readlink -f "$0")")"

# Define the path to the schema file you want to copy
schema_file="$parent_folder/prisma/schema.prisma"

# Define the paths to the two child folders within the parent folder
child_folder1="$parent_folder/questions/prisma"
child_folder2="$parent_folder/users/prisma"

# Copy the schema file to child folders
cp "$schema_file" "$child_folder1/"
cp "$schema_file" "$child_folder2/"
echo "Schema file copied to child folders."

# Run Prisma generate in the child folders
(cd "$child_folder1" && npx prisma generate)
cd "$parent_folder"

(cd "$child_folder2" && npx prisma generate)
cd "$parent_folder"
echo "Prisma generate run in child folders."
