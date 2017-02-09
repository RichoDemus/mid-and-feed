$(function () {
    console.log("Hello World");
    $.getJSON("https://api.opendota.com/api/proMatches", null, function (data) {
        parseMatch(data[0]);
        parseMatch(data[1]);
        parseMatch(data[2]);


        /*        data.forEach(match => {
         console.log(match.match_id + ": " + match.radiant_name + " vs " + match.dire_name);
         });*/

//       var radiantName = data.map((match) => match.radiant_name);
//       console.log(radiantName);
    });
});

const parseMatch = match => {
    $.getJSON("https://api.opendota.com/api/matches/" + match.match_id, null, data => {
        const midders = data.players.filter(player => player.lane_role === 2);
        const radiantMid = midders.filter(player => player.isRadiant)[0];
        const direMid = midders.filter(player => !player.isRadiant)[0];
        getHero(radiantMid.hero_id, radiantName => {
            getHero(direMid.hero_id, direName => {
                console.log(data.match_id + ": " + data.radiant_team.name + " vs " + data.dire_team.name + ", winner: " + getWinner(data) + ", " + radiantName + " vs " + direName);
                console.log(data);
            });
        });

        //console.log(result.id + ": " + result.radiant_name + " vs " + result.dire_name);

    });
    //return {"id":match.match_id, "radiant_name":match.radiant_name, "dire_name": match.dire_name}
};

const getWinner = match => {

    if (match.radiant_win)
        return match.radiant_team.name;
    return match.dire_team.name;
};

const getHero = (id, callback) => {
    $.getJSON("https://api.opendota.com/api/heroStats", null, heroes => {
        callback(heroes.filter(hero => hero.hero_id === id)[0].localized_name);
    });
};
