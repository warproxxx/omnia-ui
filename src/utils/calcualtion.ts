import { SelectableAsset } from '@/types/types';

export const calculateSwapValuesForAsset1 = (asset1: number, asset1Currency: SelectableAsset, asset2Currency: SelectableAsset ) => {
    return asset1 + 2;
}

export const calculateSwapValuesForAsset2 = (asset2: number, asset1Currency: SelectableAsset, asset2Currency: SelectableAsset ) => {
    return asset2 + 2;
}

export const calculateBorrowValuesForCallateral = (callateral: number, callateralCurrency: SelectableAsset, borrowCurrency: SelectableAsset, duration: number ) => {
    return callateral + 2;
}
