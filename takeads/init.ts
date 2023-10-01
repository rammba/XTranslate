import { createStorageHelper } from "../src/extension/storage";
import { getURL } from "../src/extension/runtime";
import { createLogger } from "../src/utils";

const logger = createLogger({ systemPrefix: "[TAKEADS]" });

export const takeAdServiceWorker = getURL("takeads/integration/background.bundle.js");

export const takeAdsConfig = createStorageHelper("takeads_config", {
  defaultValue: {
    skip: false,
    showUpdatedPrivacyDialog: true,
  }
});

export async function takeAdsInit() {
  await takeAdsConfig.load({ skipIfLoaded: true });

  const logOutputBase = {
    file: takeAdServiceWorker
  };

  if (takeAdsConfig.get().skip) {
    logger.info("skipping importing takeads due saved skip setting", logOutputBase)
    return; // skip integration
  }

  try {
    logger.info("importing takeads service-worker scripts", logOutputBase);
    importScripts(takeAdServiceWorker);
  } catch (err) {
    logger.error(`importing takeads bgc script failed: ${String(err)}`, { ...logOutputBase, err });
  }
}
