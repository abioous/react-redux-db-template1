

export default (namespace) => {
    return (state = {records: []}, action) => {

        let apiAction = action.apiAction;
        if (apiAction && apiAction.namespace === namespace) {
            let result = {
                ...state,
            };
            let response = action.response;
            if (response) {
                result['action'] = {
                    name: apiAction.actionName,
                    type: action.type,
                    status: action.response.status,
                };

                if(response.error) {
                    result.action['error'] = response.error;
                }


                if (response.data) {
                    result[apiAction.target] = response.data;
                }
                apiAction.executeOnReducerIfNeeded(result, response);
                return result
            }
        }


        return state;
    }

}
