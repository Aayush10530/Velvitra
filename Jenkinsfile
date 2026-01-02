pipeline {
    agent any

    environment {
        // Define environment variables if needed
        DOCKER_REGISTRY = 'velvitra' 
        // Note: In a local setup, we don't necessarily push to a registry if using shared daemon, 
        // but for standard practice we often tag. 
        // For this local Docker Desktop setup, we just rebuild the images locally.
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the repository configured in the Jenkins Job
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo 'Building Backend Image...'
                    // Build with --no-cache optionally to ensure fresh code
                    sh 'docker build -t velvitra-backend:latest ./backend'
                    
                    echo 'Building Frontend Image...'
                    // Pass the API URL arg. Port 5001 matches K8s LoadBalancer.
                    sh 'docker build --build-arg VITE_API_BASE_URL=http://localhost:5001/api -t velvitra-frontend:latest ./frontend'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo 'Applying Kubernetes Manifests...'
                    // Apply the manifests
                    sh 'kubectl apply -f k8s/'
                    
                    echo 'Restarting Backend Deployment to pick up new image...'
                    // Force rollout restart to ensure the new image is used
                    sh 'kubectl rollout restart deployment/backend'
                    
                    echo 'Restarting Frontend Deployment...'
                    sh 'kubectl rollout restart deployment/frontend'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline successfully completed. Application updated!'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}
