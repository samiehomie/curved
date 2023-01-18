const category = ['all', 'life', 'dog', 'bird'];

export function categoryMatcher(cateList = category) {
  return cateList.map((cate) => `/${cate}/(.+)`);
}

export default category;
