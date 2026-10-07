/**
 * Captures credentials required to authenticate in the IAM context.
 */
export class SignInCommand {
  #username: string;
  #password: string;

  /**
   * Creates a new command instance.
   * @param props - Credential values for sign-in.
   */
  constructor(props: { username: string; password: string }) {
    this.#username = props.username;
    this.#password = props.password;
  }

  /**
   * Gets the username for sign-in.
   * @returns The username.
   */
  get username(): string {
    return this.#username;
  }

  /**
   * Sets the username for sign-in.
   * @param value The username.
   */
  set username(value: string) {
    this.#username = value;
  }

  /**
   * Gets the password for sign-in.
   * @returns The password.
   */
  get password(): string {
    return this.#password;
  }

  /**
   * Sets the password for sign-in.
   * @param value The password.
   */
  set password(value: string) {
    this.#password = value;
  }
}
