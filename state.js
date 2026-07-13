const chartInstances = {};

let scoringProfiles = {
    universal: {
        categories: [],
        weights: {}
    },
    media: {}
};

let genreRegistry = {};

let editingEntryId = null;
let expandedEntryId = null;
let selectedGenres = [];
let cachedEntries = []

let activeGenreFilter = null;
let activeSort = "date_desc";
let searchQuery = "";
