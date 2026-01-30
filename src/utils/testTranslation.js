// Test translation utility - Run this in browser console to test
import { autoTranslate } from './autoTranslate';

export const testTranslation = async () => {
  console.log('🔄 Testing LibreTranslate API...');

  try {
    // Test 1: English to Arabic
    console.log('\n📝 Test 1: Translating "Hello World" to Arabic...');
    const result1 = await autoTranslate('Hello World');
    console.log('✅ Result:', result1);
    console.log('   English:', result1.en);
    console.log('   Arabic:', result1.ar);

    // Test 2: Arabic to English
    console.log('\n📝 Test 2: Translating "مرحبا بك" to English...');
    const result2 = await autoTranslate('مرحبا بك');
    console.log('✅ Result:', result2);
    console.log('   English:', result2.en);
    console.log('   Arabic:', result2.ar);

    // Test 3: Car listing
    console.log('\n📝 Test 3: Translating "Toyota Corolla Gli 2019 for sale"...');
    const result3 = await autoTranslate('Toyota Corolla Gli 2019 for sale');
    console.log('✅ Result:', result3);
    console.log('   English:', result3.en);
    console.log('   Arabic:', result3.ar);

    console.log('\n✅ All translation tests completed!');
    return { success: true, results: [result1, result2, result3] };
  } catch (error) {
    console.error('\n❌ Translation test failed:', error);
    return { success: false, error: error.message };
  }
};

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  window.testTranslation = testTranslation;
  console.log('💡 Run testTranslation() in console to test the API');
}
