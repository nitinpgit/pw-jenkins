pipeline {
   agent any
   tools {nodejs "NodeJS_20_10_0"}
   stages {
      stage('e2e-tests') {
         steps {
            git 'https://github.com/nitinpgit/pw-jenkins.git'
            bat 'npm ci'
            bat 'npx playwright test'
         }
      }
   }
}