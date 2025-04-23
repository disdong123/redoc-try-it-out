import { RedocTryItOutOptions } from "../interfaces/redoc-try-it-out-options.interface";
import { Config } from "./config";
import { InvalidElementError } from "../errors/invalid-element.error";

declare let $: any;

const DEFAULT_REDOC_VERSION = "2.0.0-rc.56";
const DEFAULT_JQUERY_VERSION = "3.6.0";
const DEFAULT_JQUERY_SCROLL_VERSION = "2.1.2";

export class RedocTryItOutConfig {
  public readonly docUrl: string | undefined;
  public readonly spec: object | undefined;
  public readonly element?: HTMLElement;

  public readonly options: RedocTryItOutOptions;

  public constructor(
    docUrl: string | undefined,
    spec: object | undefined,
    options: RedocTryItOutOptions,
    element?: HTMLElement,
  ) {
    this.options = {
      tryItOutEnabled: true,
      tryItBoxContainerId: "try-out-wrapper",
      redocVersion: DEFAULT_REDOC_VERSION,
      selectedOperationClass: "try",
      disableZenscroll: true,
      dependenciesVersions: {
        ...{
          jquery: DEFAULT_JQUERY_VERSION,
          jqueryScrollTo: DEFAULT_JQUERY_SCROLL_VERSION,
        },
        ...options.dependenciesVersions,
      },
      containerId: "redoc-container",
      operationBoxSelector: "[data-section-id]",
      cdnUrl: Config.cdnUrl,
      ...options,
    };
    this.docUrl = docUrl;
    this.spec = spec;
    this.element = element;
  }

  private get elementId(): string {
    const containerId = $(this.element).attr("id");

    if (!containerId) {
      throw new InvalidElementError("redoc container element must have an id");
    }

    return containerId;
  }

  public get tryItBoxSelector(): string {
    return `#${this.options.tryItBoxContainerId}`;
  }

  public get version(): string {
    return this.options.redocVersion || "";
  }

  public get containerId(): string {
    return this.element ? this.elementId : this.options.containerId || "";
  }

  public get containerSelector(): string {
    return `#${this.options.containerId}`;
  }

  public get operationBoxSelector(): string {
    return `${this.containerSelector} ${this.options.operationBoxSelector}`;
  }

  public get bundleUrl(): string {
    return `${this.options.cdnUrl}/redoc@${this.version}/bundles/redoc.standalone.min.js`;
  }

  public get tryItDependencies(): {
    jqueryUrl: string;
    jqueryScrollToUrl: string;
  } {
    return {
      // https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
      // https://cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js
      jqueryUrl: `${this.options.cdnUrl}/jquery@${this.options.dependenciesVersions?.jquery || ""}/dist/jquery.min.js`,
      jqueryScrollToUrl: `${this.options.cdnUrl}/jquery.scrollto@${this.options.dependenciesVersions?.jqueryScrollTo || ""}/jquery.scrollTo.min.js`,
    };
  }
}
