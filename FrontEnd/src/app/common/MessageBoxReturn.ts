import { Enum } from "./Enum";

export class MessageBoxReturn {
  public command: string;
  public cancelamentToken: boolean;
  public response: Enum.enMessageBoxResult;

  constructor (cancelamentToken?: boolean, resp?: Enum.enMessageBoxResult, command?: string) {
      this.command = command;
      this.cancelamentToken = cancelamentToken;
      this.response = resp;
  }

}
