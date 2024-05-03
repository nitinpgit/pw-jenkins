pipeline {
    agent any
    
    tools {
        // Jenkins > Manage Jenkins > Global Tools
        nodejs "node"
    }
    
    environment {
        APPLITOOLS_API_KEY = '6XxA8sMLgSKKms0TB49srvpyOJcnAwt5EGLGrs8JMdE110'
    }

    stages {
        stage('node setup') {
            steps {
                git 'https://github.com/nitinpgit/pw-jenkins.git'
                bat 'npm install'
            }
        }
        stage('Applitools playwright tests') {
            steps {
                script {
                    Applitools() {
                        bat 'npx playwright test'
                    }
                }   
            }
        }
    }
}