# Use an official Python runtime as a parent image
FROM continuumio/miniconda3

# Set the working directory in the container
WORKDIR /app

# Copy the environment file to the working directory
COPY environment.win.yml .

# Clean Conda cache
RUN conda clean --all --yes

# Create the environment
RUN conda env create -f environment.win.yml

# Make RUN commands use the new environment
SHELL ["conda", "run", "-n", "compas-node", "/bin/bash", "-c"]

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Run main.py when the container launches
CMD ["fastapi", "run", "app/main.py", "--port", "80"]