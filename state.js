const chartInstances = {};

let scoringProfiles = {
    universal: {
        categories: [],
        weights: {}
    },
    media: {}
};

let expandedGenreGroups = {
    Core: true,
    Games: false,
    Books: false,
    Video: false,
};

let genreRegistry = {};

let editingEntryId = null;
let expandedEntryId = null;
let selectedGenres = [];
let cachedEntries = []

let activeGenreFilter = null;
let activeSort = "date_desc";
let searchQuery = "";
