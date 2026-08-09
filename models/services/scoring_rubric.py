SCORING_RUBRIC = {
    1: "Terrible — fundamentally fails; little to no redeeming value.",
    2: "Very poor — major problems dominate the experience.",
    3: "Poor — significant weaknesses outweigh the strengths.",
    4: "Below average — some worthwhile qualities, but clearly flawed.",
    5: "Okay — acceptable and functional, but neither notably good nor bad.",
    6: "Decent — more strengths than weaknesses, but still noticeably limited.",
    7: "Good — clearly successful with meaningful strengths and relatively minor flaws.",
    8: "Very good — strong execution with only a few notable weaknesses.",
    9: "Excellent — exceptional quality with very little meaningful room for improvement.",
    10: "No improvement possible — essentially perfect for the category being scored.",
}


def get_score_meaning(score):
    return SCORING_RUBRIC.get(score)


METRIC_RUBRICS = {
    "depth": {
        1: "Ask whether the work is almost entirely surface-level, with little meaningful substance to interpret or consider.",
        2: "Ask whether there are major limitations in the work's ideas, themes, or substance, with little beyond the immediate experience.",
        3: "Ask whether the work has some meaningful ideas or themes, but whether they are underdeveloped, obvious, or inconsistently handled.",
        4: "Ask whether the work offers some substance to think about, but whether its ideas remain fairly limited, straightforward, or shallow.",
        5: "Ask whether the work provides an acceptable amount of substance and meaning, without offering especially substantial layers of interpretation.",
        6: "Ask whether the work offers meaningful ideas, themes, or layers that go beyond the surface, even if those elements are not especially developed or complex.",
        7: "Ask whether the work presents strong ideas, themes, or layers that reward attention and interpretation, with only some limitations in depth or development.",
        8: "Ask whether the work demonstrates substantial ideas, themes, or layers that meaningfully reward interpretation and reflection, with relatively minor limitations.",
        9: "Ask whether the work is exceptionally rich in ideas, themes, or layers, repeatedly rewarding analysis and revealing meaningful depth with very few shortcomings.",
        10: "Ask whether the work offers essentially limitless meaningful interpretation or extraordinary conceptual depth, with no meaningful improvement possible in this category.",
    },
    "craft": {
        1: "Ask whether the work's execution is fundamentally poor, with pervasive technical or artistic weaknesses that substantially undermine the experience.",
        2: "Ask whether major execution problems are consistently visible across the work, with only limited evidence of effective craftsmanship.",
        3: "Ask whether the work demonstrates some competent execution, but whether noticeable technical or artistic weaknesses frequently interfere with the experience.",
        4: "Ask whether the work is competently made overall, but whether execution is inconsistent or limited in ways that noticeably hold it back.",
        5: "Ask whether the work demonstrates acceptable craftsmanship without being particularly polished, refined, or technically impressive.",
        6: "Ask whether the work is well executed in most respects, with clear evidence of care and competence despite some noticeable limitations.",
        7: "Ask whether the work demonstrates strong and consistent craftsmanship, with relatively few execution problems.",
        8: "Ask whether the work demonstrates very strong craftsmanship, with polished execution and only relatively minor weaknesses.",
        9: "Ask whether the work demonstrates exceptional craftsmanship across nearly every relevant aspect, with very few meaningful execution flaws.",
        10: "Ask whether the execution is essentially exemplary for its medium and purpose, leaving no meaningful room for improvement in craftsmanship.",
    },
    "engagement": {
        1: "Ask whether the work consistently fails to hold attention or generate interest, making continued engagement difficult.",
        2: "Ask whether the work rarely sustains interest and frequently loses attention despite occasional engaging moments.",
        3: "Ask whether the work provides some engaging moments, but whether interest frequently drops or requires significant effort to maintain.",
        4: "Ask whether the work is intermittently engaging, with enough moments of interest to remain watchable or playable but substantial stretches that fail to hold attention.",
        5: "Ask whether the work maintains an acceptable level of engagement overall, without being especially compelling or difficult to put down.",
        6: "Ask whether the work generally holds attention and creates a meaningful desire to continue, despite some slower or less engaging stretches.",
        7: "Ask whether the work consistently holds attention and creates a strong desire to continue, with relatively few disengaging moments.",
        8: "Ask whether the work is highly engaging, consistently maintaining interest and momentum while making continued attention feel natural rather than effortful.",
        9: "Ask whether the work is exceptionally compelling, sustaining attention almost continuously and creating a strong pull to keep experiencing it.",
        10: "Ask whether the work is virtually impossible to improve in terms of engagement, maintaining exceptional attention and investment throughout with no meaningful loss of interest.",
    },
    "emotional_impact": {
        1: "Ask whether the work produces little to no meaningful emotional response, with its intended emotional moments failing to connect.",
        2: "Ask whether the work occasionally produces a weak emotional response, but whether most attempts at emotional impact feel ineffective or disconnected.",
        3: "Ask whether the work creates some genuine emotional reactions, but whether they are limited, inconsistent, or quickly forgotten.",
        4: "Ask whether the work has several emotionally effective moments, but whether its overall emotional impact remains fairly modest or inconsistent.",
        5: "Ask whether the work produces an acceptable emotional response, with some moments that connect without leaving a particularly strong or lasting impression.",
        6: "Ask whether the work regularly creates genuine emotional reactions and establishes some meaningful emotional investment, despite noticeable limitations.",
        7: "Ask whether the work creates strong emotional investment and several memorable emotional moments, with relatively few weaknesses.",
        8: "Ask whether the work produces a strong and lasting emotional response, with its emotional moments feeling earned, meaningful, and consistently effective.",
        9: "Ask whether the work is exceptionally emotionally resonant, producing powerful and memorable reactions that remain significant after the experience ends.",
        10: "Ask whether the work achieves essentially unparalleled emotional resonance for its purpose, leaving no meaningful room for improvement in emotional impact.",
    },
    "presentation": {
        1: "Ask whether the work's presentation is consistently distracting, confusing, or poorly executed enough to substantially interfere with the experience.",
        2: "Ask whether major presentation problems are frequently distracting, with only limited evidence of effective visual, structural, or sensory presentation.",
        3: "Ask whether the work is generally understandable but has frequent presentation weaknesses that noticeably reduce clarity, cohesion, or immersion.",
        4: "Ask whether the work is adequately presented overall, but whether inconsistencies or limitations are frequently noticeable.",
        5: "Ask whether the work is presented competently and clearly enough to support the experience, without being especially polished or distinctive.",
        6: "Ask whether the work is well presented in most respects, with effective clarity, cohesion, and sensory or structural choices despite some limitations.",
        7: "Ask whether the work demonstrates strong presentation that consistently supports its intended experience, with relatively few distracting weaknesses.",
        8: "Ask whether the work is highly polished and cohesive in its presentation, with its visual, structural, or sensory choices consistently enhancing the experience.",
        9: "Ask whether the work demonstrates exceptional presentation throughout, with an unusually strong sense of polish, cohesion, and intentionality.",
        10: "Ask whether the presentation is essentially exemplary for the work's medium and purpose, leaving no meaningful room for improvement.",
    },
    "originality": {
        1: "Ask whether the work feels almost entirely derivative, relying heavily on familiar ideas, structures, conventions, or execution without adding a meaningful individual identity.",
        2: "Ask whether the work contains very little that feels distinctive, with most of its ideas or presentation closely resembling familiar existing works.",
        3: "Ask whether the work includes occasional distinctive ideas or choices, but whether its overall identity remains substantially conventional or derivative.",
        4: "Ask whether the work demonstrates some individuality through particular ideas, combinations, or stylistic choices, while remaining mostly familiar in its approach.",
        5: "Ask whether the work has a recognizable individual identity and some fresh ideas or combinations, without being especially novel or groundbreaking.",
        6: "Ask whether the work regularly introduces distinctive ideas, combinations, perspectives, or stylistic choices that meaningfully differentiate it from familiar works.",
        7: "Ask whether the work demonstrates strong originality, with multiple ideas or approaches that feel genuinely distinctive and contribute meaningfully to its identity.",
        8: "Ask whether the work consistently demonstrates a highly distinctive creative identity, combining ideas or approaches in ways that feel fresh and meaningfully uncommon.",
        9: "Ask whether the work is exceptionally original, introducing or combining ideas, perspectives, systems, or stylistic approaches in ways that feel genuinely rare and difficult to mistake for conventional work.",
        10: "Ask whether the work achieves essentially unmatched originality for its purpose, presenting a remarkably distinctive creative identity with no meaningful room for greater novelty or individuality.",
    },
}


def get_metric_meaning(metric, score):
    return METRIC_RUBRICS.get(metric, {}).get(score)
