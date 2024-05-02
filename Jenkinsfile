pipeline {
    agent any
    
    tools {
        nodejs "node"
    }

    stages {
        stage('node setup') {
            steps {
                echo 'pipeline starts'
                git 'https://github.com/nitinpgit/pw-jenkins.git'
                bat 'npm install'
            }
        }
        stage('playwright tests') {
            steps {
                bat 'npx playwright test'
                echo 'pipeline ends'
            }
        }
    }
}
