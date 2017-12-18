/**
 * Created by Muslum on 29.07.2017.
 */

import Request from "../../service/Request";

const types = {
    COMMENT_ADD_REQUEST: 'COMMENT_ADD_REQUEST',
    COMMENT_ADD_SUC: 'COMMENT_ADD_SUC',
    COMMENT_ADD_FAIL: 'COMMENT_ADD_FAIL',
    COMMENT_GET_SESSION_REQUEST: 'COMMENT_GET_SESSION_REQUEST',
    COMMENT_GET_SESSION_SUC: 'COMMENT_GET_SESSION_SUC',
    COMMENT_GET_SESSION_FAIL: 'COMMENT_GET_SESSION_FAIL',
    COMMENT_GET_USER_REQUEST: 'COMMENT_GET_USER_REQUEST',
    COMMENT_GET_USER_SUC: 'COMMENT_GET_USER_SUC',
    COMMENT_GET_USER_FAIL: 'COMMENT_GET_USER_FAIL',
}

import {getCOMMENT, getEvent, postCOMMENT} from '../API'

const initialState = {
    loading: false,
    error: false,
    comment: Object,
    commentList:Array,
    commentListByUser:Array,
    errorMessage: String,

};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case types.COMMENT_ADD_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                comment: {},
            }
        }
        case types.COMMENT_ADD_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                comment: payload,
            }
        }
        case types.COMMENT_ADD_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                comment: {},
                errorMessage: payload
            }
        }
        case types.COMMENT_GET_SESSION_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                commentList: [],
            }
        }
        case types.COMMENT_GET_SESSION_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                commentList: payload,
            }
        }
        case types.COMMENT_GET_SESSION_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                commentList: [],
                errorMessage: payload
            }
        }
        case types.COMMENT_GET_USER_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                commentListByUser: [],
            }
        }
        case types.COMMENT_GET_USER_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                commentListByUser: payload,
            }
        }
        case types.COMMENT_GET_USER_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                commentListByUser: [],
                errorMessage: payload
            }
        }
    }
    return state;

}

export const actionCreators = {

    postComment: (eventId,sessionId,userId,commentValue,time) => async (dispatch, getState) => {
        dispatch({
            type: types.COMMENT_ADD_REQUEST
        })

        await Request.POST(postCOMMENT,{eventId,sessionId,userId,commentValue,time},{
            '200': (res)=>{
                console.log(res)
                if (res.status )
                    dispatch({
                        type: types.COMMENT_ADD_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.COMMENT_ADD_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.COMMENT_ADD_FAIL,
                    payload:res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.COMMENT_ADD_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    getCommentsSession: (eventId,sessionId) => async (dispatch, getState) => {
        dispatch({
            type: types.COMMENT_GET_SESSION_REQUEST
        })
        console.log(eventId+" "+sessionId+" "+getCOMMENT)
        await Request.GET(getCOMMENT+eventId+"/"+sessionId,{
            '200': (res)=>{
                console.log(res)
                if (res.status)
                    dispatch({
                        type: types.COMMENT_GET_SESSION_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.COMMENT_GET_SESSION_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.COMMENT_GET_SESSION_FAIL,
                    payload: res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.COMMENT_GET_SESSION_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },

}

export default reducer





