/**
 * Captures credentials required to register a new IAM account.
 */
export class SignUpCommand {
  #username: string;
  #password: string;

  /**
   * Creates a new command instance.
   * @param props - Credential values for sign-up.
   */
  constructor(props: { username: string; password: string }) {
    this.#username = props.username;
    this.#password = props.password;
  }

  /**
   * Gets the username for sign-up.
   * @returns The username.
   */
  get username(): string {
    return this.#username;
  }

  /**
   * Sets the username for sign-up.
   * @param value The username.
   */
  set username(value: string) {
    this.#username = value;
  }

  /**
   * Gets the password for sign-up.
   * @returns The password.
   */
  get password(): string {
    return this.#password;
  }

  /**
   * Sets the password for sign-up.
   * @param value The password.
   */
  set password(value: string) {
    this.#password = value;
  }
}
