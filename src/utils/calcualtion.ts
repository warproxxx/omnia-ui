import { SelectableAsset } from '@/types/types';

export const calculateSwapValuesForAsset1 = async (asset1: number, asset1Currency: SelectableAsset, asset2Currency: SelectableAsset ) => {
    return asset1 + 2;
}

export const calculateSwapValuesForAsset2 = async (asset2: number, asset1Currency: SelectableAsset, asset2Currency: SelectableAsset ) => {
    return asset2 + 2;
}

export const calculateBorrowValuesForCallateral = async (callateral: number, callateralCurrency: SelectableAsset, borrowCurrency: SelectableAsset, duration: number ) => {
    return callateral + 2;
}
