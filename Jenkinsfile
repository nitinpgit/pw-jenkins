pipeline {
   agent any
   tools {nodejs "NodeJS_20_10_0"}
   stages {
      stage('e2e-tests') {
         steps {
            git 'https://github.com/nitinpgit/pw-jenkins.git'
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
}