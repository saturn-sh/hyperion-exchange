/**
 * Represents a snowflake of a Discord object.
 */
export type DiscordSnowflake = string | number;

/**
 * Interface representing a connector to interact with a currency API.
 */
export interface CurrencyConnector {
  /**
   * The full, user-friendly display name of the currency this connector interacts with.
   * @readonly
   */
  readonly currencyName: string;
  /**
   * A short code used to refer to the currency this connector interacts with.
   * @readonly
   */
  readonly currencyCode: string;

  /**
   * The url of the currency's site.
   * @readonly
   */
  readonly currencySite: string | null;

  readonly tags: Array<string>;

  /**
   * Retrieve the amount of this currency a given user has.
   * @param user The user to retrieve a balance for.
   * @returns The user's balance of this currency.
   */
  getBalance(user: DiscordSnowflake): Promise<number | null>;
  /**
   * Modify the balance of this currency for a given user.
   * @param user The user to modify the balance for.
   * @param amount The amount to change the user's balance by (positive to add, negative to subtract).
   * @returns The user's new balance.
   */
  addBalance(user: DiscordSnowflake, amount: number): Promise<number>;
  /**
   * Retrieves the total amount of this currency in circulation.
   * @returns The combined balances of all users of this currency.
   */
  getTotalInCirculation(): Promise<number>;
  /**
   * Retrieves the balances of all users.
   * @returns The balances and snowflakes of all users this currency is aware of.
   */
  getAllBalances(): Promise<Array<BalanceDetails>>;
}

/**
 * Utility type to represent a typical string to object dictionary.
 * @typeparam T The type of value that is associated with keys for this dictionary.
 */
export type Dictionary<T> = {
  [key: string]: T;
};

export type UserDetails = {
  snowflake: DiscordSnowflake;
  username: string;
  discriminator: string;
  profilePicture: string;
};

/**
 * Represents a given user's balance details.
 */
export type UserBalanceDetails = {
  user: UserDetails;
  balances: Dictionary<number | null>;
};

/**
 * Represents a response for a user's balance for a given currency.
 */
export type BalanceDetails = {
  user: UserDetails | DiscordSnowflake;
  balance: number | null;
};

export type IndividualDetailResponses =
  | UserBalanceDetails
  | BalanceDetails
  | CurrencyDetailsResponse;

export type ValidDetails =
  | Array<IndividualDetailResponses>
  | IndividualDetailResponses
  | ErrorDetails;

/**
 * Represents an error response for a given API request.
 */
export type ErrorDetails = {
  error: string;
  statusCode: number;
};

/**
 * Type guard for determining if a given object is an [[ErrorDetails]] instance.
 * @param details The object to check.
 * @returns Whether or not the object is an instance of [[ErrorDetails]].
 */
export function isErrorDetail(details: any): details is ErrorDetails {
  return 'error' in details;
}

/**
 * Represents details for a given currency.
 */
export type CurrencyDetails = {
  name: string;
  shortCode: string;
  site: string | null;
  tags: Array<string>;
};

export type CurrencyDetailsResponse = {
  currency: CurrencyDetails;
  balances: Array<BalanceDetails>;
};
