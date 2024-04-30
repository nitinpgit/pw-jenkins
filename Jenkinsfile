pipeline {
   agent any
   tools {nodejs "NodeJS_20_10_0"}
   stages {
      stage('git checkout') {
         steps {
            git 'https://github.com/nitinpgit/pw-jenkins.git'
         }
      }
      stage('setup') {
         steps {
            sh 'npm ci'
            sh 'npx playwright install'
         }
      }
      stage('e2e tests') {
         steps {
            sh 'npx playwright test'
         }
      }
   }
}