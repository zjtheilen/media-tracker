from .signals import collect_signals


def generate_recommendations(profile, candidates):

    signals = collect_signals(profile)

    recommendations = []

    return recommendations