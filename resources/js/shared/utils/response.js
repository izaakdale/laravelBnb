export const is404 = function (error){
    return isErrorWithResponseAndStauts && error.response.status === 404;
};

export const is422 = function (error){
    return isErrorWithResponseAndStauts && error.response.status === 422;
};

const isErrorWithResponseAndStauts = function (error){
    return error.response && error.response.status;
}