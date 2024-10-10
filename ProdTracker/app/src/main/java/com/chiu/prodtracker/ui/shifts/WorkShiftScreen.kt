package com.chiu.prodtracker.ui.shifts

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.chiu.prodtracker.ui.theme.ProdTrackerTheme

@Composable
fun WorkShiftScreen(
    modifier: Modifier
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier
            .fillMaxSize()
    ) {
        OutlinedButton(onClick = {  }) {
            Text(text = "Start Work", modifier.width(100.dp), textAlign = TextAlign.Center)
        }
        Spacer(modifier = Modifier.height(48.dp))
        OutlinedButton(onClick = {  }, ) {
            Text(text = "Lunch", modifier.width(100.dp), textAlign = TextAlign.Center)
        }
        Spacer(modifier = Modifier.height(48.dp))
        OutlinedButton(onClick = {  }) {
            Text(text = "End Work", modifier.width(100.dp), textAlign = TextAlign.Center)
        }
    }
}

@Preview(showBackground = true)
@Composable
fun WorkShiftScreenPreview() {
    ProdTrackerTheme {
        WorkShiftScreen(modifier = Modifier)
    }
}
