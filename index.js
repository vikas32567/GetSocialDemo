

$(document).ready(function() {
    // Initialize SDK
    GetSocialSDK.GetSocial.init({
        appId: '7F8NL0R7898a9',
        appName: 'Testfire'
    });

    $('#authBtn').click(function () {
        // Authenticate with a trusted identity
        GetSocialSDK.Auth.authenticate({
            identity_type: 'email',
            token: $('#authText').val()
        })
        .then(function (response) {
            console.log(`${response.user.displayName} is authenticated`);
            console.log(response.user);
        
            fetchAllPosts();
            fetchPostsInAllTopics();
            fetchPostsInTimeline();
        
        })
        .catch(console.log);
    });
    


    $('#joinGroupBtn').click(function() {
        var groupId = $('#joinGroupId').val();
        GetSocialSDK.Communities.joinGroup(
            GetSocialSDK.JoinGroupQuery.create(groupId)
        ).then(response => {
            console.log(response);

            // print all activities
            GetSocialSDK.Communities.getActivities(
                new GetSocialSDK.PagingQuery(
                    GetSocialSDK.ActivitiesQuery.everywhere()
                )
            ).then(response => {
                console.log(response);
            });
        });
    });
    $('#joinTopicBtn').click(function() {
        var topicId = $('#joinTopicId').val();
        var followQuery = GetSocialSDK.FollowQuery.topics([topicId]);
        GetSocialSDK.Communities.follow(followQuery).then(response => {
            console.log("Added user to topic");
            console.log(response);
        });
    });


    $('#postGroupBtn').click(function() {
        let content = $('#postGroupText').val();
        let groupId = $('#postGroupId').val();
        let target = GetSocialSDK.PostActivityTarget.group(groupId);
        postActivity(content, target);
    });
    
    $('#postTopicBtn').click(function() {
        let text = $('#postTopicText').val();
        let topicId = $('#postTopicId').val();
        let target = GetSocialSDK.PostActivityTarget.topic(topicId);
        postActivity(text, target);
    });

    $('#postTimelineBtn').click(function() {
        let text = $('#postTimelineText').val();
        let target = GetSocialSDK.PostActivityTarget.timeline();
        postActivity(text, target);
    });
    
    function postActivity(text, target) {
        var content = { text : text}
        GetSocialSDK.Communities.postActivity(content, target).then(response => {
            console.log('Posted to:');
            console.log(target);
            console.log(content);
            console.log(response);

            fetchAllPosts();
            fetchPostsInAllTopics();
            fetchPostsInTimeline();

        });
    }



    function fetchAllPosts() {
        GetSocialSDK.Communities.getActivities(
            new GetSocialSDK.PagingQuery(
                GetSocialSDK.ActivitiesQuery.everywhere()
            )
        ).then(response => {
            console.log("All posts");
            console.log(response);
        });
    }

    function fetchPostsInAllTopics() {
        GetSocialSDK.Communities.getActivities(
            new GetSocialSDK.PagingQuery(
                GetSocialSDK.ActivitiesQuery.inAllTopics()
            )
        ).then(response => {
            console.log("All posts in all topics");
            console.log(response);
        });
    }

    function fetchPostsInTimeline() {
        GetSocialSDK.Communities.getActivities(
            new GetSocialSDK.PagingQuery(
                GetSocialSDK.ActivitiesQuery.everywhere().byUser(
                    GetSocialSDK.UserId.currentUser()
                )
            )
        ).then(response => {
            console.log("All posts by current user");
            console.log(response);
        });
    }
    
});

