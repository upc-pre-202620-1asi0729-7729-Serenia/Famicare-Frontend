import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an authenticated account in the IAM domain model.
 */
export class User implements BaseEntity {
  #id: number;
  #username: string;

  /**
   * Creates a new user entity.
   * @param props - Immutable initialization values.
   */
  constructor(props: { id: number; username: string }) {
    this.#id = props.id;
    this.#username = props.username;
  }

  /**
   * Gets the ID of the user.
   * @returns The ID.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the ID of the user.
   * @param value The new ID.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the username of the user.
   * @returns The username.
   */
  get username(): string {
    return this.#username;
  }

  /**
   * Sets the username of the user.
   * @param value The new username.
   */
  set username(value: string) {
    this.#username = value;
  }
}
