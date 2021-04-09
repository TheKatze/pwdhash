<template>
  <v-container class="about">
    <v-card>
      <v-card-title>
        About pwdhash
      </v-card-title>
      <v-card-text>
        pwdhash is a password manager that does not save your passwords, but instead generates unique passwords for every website on the fly. <br />
        It is heavily inspired by <a href="https://pwdhash.github.io/website/">Stanford PwdHash</a> and works very similarly, with some improvements.
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        How it works
      </v-card-title>
      <v-card-text>
        pwdhash saves the login information for your websites in your local storage, then generates your password using a secure hashing algorithm (pbkdf2)
        with your unlock password and the login information. This ensures a unique and secure password for every website. <br />
        So if one of your online services gets compromised, your other accounts stay safe.
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        How it really works
      </v-card-title>
      <v-card-text>
        <code>
          format(
            base64(
              pbkdf2(unlockPassword, url + username, iterations, keyLength, "sha512")
            )
          )
        </code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
</style>