export class StringTemplateEngine {
  private tokensToReplace: string[];
  private values: object;
  private array: any[];

  // helper function
  public format(string, options) {
    // evaluate expressions
    string = this.evaluateString(string, options);

    // if options.array is defined, then evaluate template
    string = this.replaceGivenArray(string, options);

    // if options.values is defined, then evaluate template
    string = this.replaceGivenObject(string, options);

    return string;
  }

  // evaluate in-line expressions
  private evaluateString(string, options) {
    this.tokensToReplace = string.match(new RegExp(/({{=[^}]*}})/g)) || [];

    this.tokensToReplace.map((token) => {
      string = string.replace(token, () => {
        return `${token.replace('{{=', '').replace('}}', '')}`;
      });
    });

    return string;
  }

  // replace given object
  private replaceGivenObject(string, options) {
    this.values = options && options.values ? options.values : {};
    this.tokensToReplace =
      string.match(new RegExp(/({{[ ]*[^}.]+[ ]*}})/g)) || [];

    this.tokensToReplace.map((token) => {
      string = string.replace(
        token,
        this.values[
          token
            .replace(' ', '')
            .replace('{{', '')
            .replace('}}', '')
        ],
      );
    });

    return string;
  }

  // replace given array index
  private replaceGivenArray(string, options) {
    this.array = options && options.array ? options.array : {};
    this.tokensToReplace =
      string.match(new RegExp(/({{[ ]*[0-9]+[ ]*}})/g)) || [];

    this.tokensToReplace.map((token) => {
      string = string.replace(
        token,
        this.array[
          parseInt(
            token
              .replace(' ', '')
              .replace('{{', '')
              .replace('}}', ''),
            10,
          )
        ],
      );
    });

    return string;
  }
}

export default StringTemplateEngine;
