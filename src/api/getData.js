import fetch from '@/config/fetch'

export const login = data => fetch('/user/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/user/signout');


/**
 * 用户列表接口
 */
export const getUserListAdmin = data => fetch('/user/list', data, 'POST');

export const getUserDetail = data => fetch('/user/detail', data, 'POST');

export const deleteUserAdmin = data => fetch('/user/delete', data, 'POST');

export const updateUserAdmin = data => fetch('/user/update', data, 'POST');

export const updateUser = data => fetch('/user/update', data, 'POST');

export const addUserAdmin = data => fetch('/user/add', data, 'POST');


/**
 * 课程管理接口
 */
export const addCourse = data => fetch('/course/add', data, 'POST');
export const courseList = data => fetch('/course/list', data, 'POST');
export const listOtherPopularCourse = data => fetch('/course/listOtherPopularCourse', data, 'POST');
export const courseDetail = data => fetch('/course/detail', data, 'POST');
export const updateCourse = data => fetch('/course/update', data, 'POST');
export const deleteCourse = data => fetch('/course/delete', data, 'POST');

/**
 * 图标接口
 */
export const counthit = data => fetch('/course/counthit', data, 'POST');
export const studytime = data => fetch('/course/studytime', data, 'POST');

/**
 * 记录时间接口
 */
export const addRecord = data => fetch('/course/time/add', data, 'POST');
export const commentList = data => fetch('/comment/list', data, 'POST');
export const addComment = data => fetch('/comment/add', data, 'POST');
export const deleteComment = data => fetch('/comment/delete', data, 'POST');




/**
 * 日志接口
 */
export const logList = data => fetch('/log/list', data, 'POST');
export const logAdd = data => fetch('/log/add', data, 'POST');


/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/user/detail');






