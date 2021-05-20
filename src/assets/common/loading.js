import { Loading } from 'element-ui';
import _ from 'lodash'

let loadingCount = 0;
let loading;

export const startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: "加载中……"
    });
};

export const endLoading = () => {
    loading.close();
};

export const showLoading = () => {
    if (loadingCount === 0) startLoading();
    loadingCount++;
};

export const hideLoading = () => {
    if (loadingCount <= 0) return;
    loadingCount--;
    if (loadingCount === 0) {
        _.debounce(endLoading ,250)();
    }
};
