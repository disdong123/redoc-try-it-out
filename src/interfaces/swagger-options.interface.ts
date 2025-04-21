export type CallbackFunction = () => void;

export interface SwaggerOptions {
  url?: string;
  spec?: object;
  dom_id?: string;
  version?: string;
  authorizeBtnSelector?: string;
  authorizeDoneBtnSelector?: string;
  authorizeModalSelector?: string;
  authorizeModalCloseBtnSelector?: string;
  operationSectionContainerSelector?: string;
  operationContainerSelector?: string;
  operationSummaryPatternSelector?: string;
  hideClass?: string;
  showClass?: string;
  authModalClass?: string;
  selectedOperationContainerClass?: string;
  wrapperSelector?: string;
  onComplete?: CallbackFunction;
}
