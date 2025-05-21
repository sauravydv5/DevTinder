# DevTinder Api

## authRouter

-POST /signup
-POST /login
-POST /logout

## profileRouter

-GET /profile/view
-PATCH /Profile/edit
-PATCH/profile/password

## connectionRequestRouter

-POST/request/send/intrested/:userId
-POST /reqested/send/igorned/:userId
-POST /request/rewiew/accepted/:requestId
-POST /request/rewiew/rejected/:requestId

## userRouter

-GET/user/connections
-GET/user/requests/received
-GET/user/Feed -Gets profile of other user in display

Status: ignore , intresated,accepted,rejected...
