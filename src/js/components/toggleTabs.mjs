export function toggleTabs(tabsTriggerClass, tabsContentClass) {
  const tabsTriggers = document.querySelectorAll(tabsTriggerClass);
  const tabsContents = document.querySelector(tabsContentClass);
  tabsContentClass.forEach((content) => {
    content.classList.add('hidden');
    tabsContents[0].classList.remove('hidden');
  });
  tabsTriggers.forEach((trigger, i) => {
    trigger.addEventListener('click', () => {
      tabsTriggers.forEach((tab) => tab.classList.remove('active'));

      trigger.classList.add('active');

      tabsContentClass.forEach((content) => {
        content.classList.add('hidden');
      });

      tabsContents[i].classList.remove('hidden');
    });
  });
}
