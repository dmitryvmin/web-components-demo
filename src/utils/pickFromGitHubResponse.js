function pickFromGitHubResponse(results, key = 'items') {
  return results[key] ? results[key] : [];
}

export default pickFromGitHubResponse;
