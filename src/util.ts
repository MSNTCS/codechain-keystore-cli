import { Key } from "codechain-keystore/lib/types";
import { AssetAddress, PlatformAddress } from "codechain-primitives";
import * as _ from "lodash";

import { CLIError, CLIErrorType } from "./error";
import { AccountType } from "./types";

export function getAddressFromKey(
    accountType: AccountType,
    key: Key,
    networkId: string
): string {
    if (accountType === "platform") {
        const platformAddress = PlatformAddress.fromAccountId(key, {
            networkId
        });
        return platformAddress.toString();
    } else if (accountType === "asset") {
        const assetAddress = AssetAddress.fromTypeAndPayload(1, key, {
            networkId
        });
        return assetAddress.toString();
    } else {
        throw new CLIError(CLIErrorType.InvalidAccountType);
    }
}

export function findMatchingKey(
    accountType: AccountType,
    keys: Key[],
    address: string,
    networkId: string
): string {
    const addresses = _.map(keys, key =>
        getAddressFromKey(accountType, key, networkId)
    );
    const index = _.indexOf(addresses, address);
    if (index === -1) {
        throw new CLIError(CLIErrorType.NoSuchAddress, { address });
    }

    return keys[index];
}
